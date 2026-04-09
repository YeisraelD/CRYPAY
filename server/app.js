// Core Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); 
const cors = require('cors');

const app = express();

// Global Middleware
app.use(cors());
app.use(bodyParser.json());

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Security Hardening: Basic Protective Headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    next();
});

// Import Project Modules
const CoinGecko = require('coingecko-api');
const crypto = require('./crypto/ether.js');
const AppError = require('./utils/appError');
const { getEthBalance, getEthBalances, verifyTransaction } = crypto;

const helpers = require('./helper.js');
const validate = require('./middleware/validator');
const { searchTickers } = helpers;

const data = require("./tickers.json");
var tickers = { data };

const cache = { feedback: {} };
const coinGeckoClient = new CoinGecko();

const second = 1000;
const minute = 60 * second;

const getCoin = async (token) => {
    if (cache[token] && (cache[token].timestamp - minute < Date.now())) {
        return cache[token];
    }

    const { data } = await coinGeckoClient.coins.fetch(token, {});
    const name = data.name;
    const { image, market_data, links } = data;
    const { current_price } = market_data;

    const out = { image, current_price, links, name, timestamp: Date.now() };
    cache[token] = out;

    return out;
};

const supported = ["ethereum", "bitcoin", "tether"];

// ===== Routers =====
const ethRouter = express.Router();
const paymentsRouter = express.Router();

ethRouter.get('/price', async (req, res) => {
    const price = await getCoin("ethereum");
    res.json({ price });
});

ethRouter.post('/balance', validate(['acct']), async (req, res) => {
    const price = await getCoin("ethereum");
    const balance = await getEthBalance(req.body.acct, price.current_price.usd);
    res.json({ balance });
});

ethRouter.post('/mulBalance', validate(['accts']), async (req, res) => {
    const price = await getCoin("ethereum");
    const balance = await getEthBalances(req.body.accts, price.current_price.usd);
    res.json({ balance });
});

paymentsRouter.post('/create', validate(['price', 'info', 'id']), async (req, res) => {
    const { price, info, id } = req.body;
    cache[id] = { price, info, id, status: "created" };
    res.json({ res: "success" });
});

paymentsRouter.post('/get', validate(['id']), async (req, res) => {
    const { id } = req.body;
    if (cache[id]) {
        res.json({ res: "success", body: cache[id] });
    } else {
        res.json({ res: "fail" });
    }
});

paymentsRouter.post('/complete', validate(['id']), async (req, res) => {
    const { id } = req.body;
    let verify = await verifyTransaction(req.body);
    
    if (verify === "complete") {
        cache[id] = { ...cache[id], ...req.body, status: "COMPLETED" };
        res.json({ res: "success", status: "COMPLETED" });
    } else if (verify === "pending" || verify === null) {
        cache[id].status = "PENDING";
        res.json({ res: "waiting", status: "PENDING" });
    } else {
        cache[id].status = "FAILED";
        res.json({ res: "fail", status: "FAILED" });
    }
});

app.use("/eth", ethRouter);
app.use("/payments", paymentsRouter);

app.get('/all', async (req, res) => {
    let dataArr = [];
    await Promise.all(supported.map(async (tick) => {
        try {
            let out = await getCoin(tick);
            dataArr.push(out);
        } catch { }
    }));
    res.json({ all: dataArr });
});

app.get('/cache', async (req, res) => {
    res.json({ cache });
});

app.post('/search', validate(['term']), async (req, res) => {
    let searchIds = searchTickers(tickers.data, req.body.term);
    let dataArr = [];
    await Promise.all(searchIds.map(async ({ id: tick }) => {
        try {
            let out = await getCoin(tick);
            dataArr.push(out);
        } catch { }
    }));
    res.json({ all: dataArr.slice(0, 20) });
});

app.post('/feedback', validate(['feedback']), async (req, res) => {
    cache.feedback[uuidv4()] = req.body.feedback;
    res.sendStatus(200);
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'up', 
        uptime: process.uptime(),
        timestamp: new Date().toISOString() 
    });
});

const { version } = require('./package.json');
app.get('/version', (req, res) => {
    res.json({ 
        version,
        env: process.env.NODE_ENV || 'development'
    });
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        else {
            console.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    }
});

module.exports = app;
