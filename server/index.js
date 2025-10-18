const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // fixed uuid import
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CoinGecko = require('coingecko-api');
const crypto = require('./crypto/ether.js');
const { getEthBalance, getEthBalances, verifyTransaction } = crypto;

const jobs = require('./jobs.js');
const helpers = require('./helper.js');
const { searchTickers } = helpers;

const data = require("./tickers.json"); // coin info
var tickers = { data }; // wrap in an object

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

// ETH routes
ethRouter.get('/price', async (req, res) => {
    const price = await getCoin("ethereum");
    res.json({ price });
});

ethRouter.post('/balance', async (req, res) => {
    const price = await getCoin("ethereum");
    const balance = await getEthBalance(req.body.acct, price.current_price.usd);
    res.json({ balance });
});

ethRouter.post('/mulBalance', async (req, res) => {
    const price = await getCoin("ethereum");
    const balance = await getEthBalances(req.body.accts, price.current_price.usd);
    res.json({ balance });
});

// Payments routes
paymentsRouter.post('/create', async (req, res) => {
    const { price, info, id } = req.body;
    cache[id] = { price, info, id, status: "created" };
    res.json({ res: "success" });
});

paymentsRouter.post('/get', async (req, res) => {
    const { id } = req.body;
    if (cache[id]) {
        res.json({ res: "success", body: cache[id] });
    } else {
        res.json({ res: "fail" });
    }
});

paymentsRouter.post('/complete', async (req, res) => {
    const { id } = req.body;
    let verify = await verifyTransaction(req.body);
    if (verify == "complete") {
        cache[id] = { ...cache[id], ...req.body, status: verify };
        res.json({ res: "success" });
    } else if (verify == "created") {
        res.json({ res: "waiting" });
    } else {
        res.json({ res: "fail" });
    }
});

// Mount routers
app.use("/eth", ethRouter);
app.use("/payments", paymentsRouter);

// Other routes
app.get('/all', async (req, res) => {
    let dataArr = [];
    await Promise.all(supported.map(async (tick) => {
        try {
            let out = await getCoin(tick);
            dataArr.push(out);
        } catch {}
    }));
    res.json({ all: dataArr });
});

app.get('/cache', async (req, res) => {
    console.log(cache);
    res.json({ cache });
});

app.post('/search', async (req, res) => {
    let searchIds = searchTickers(tickers.data, req.body.term);
    let dataArr = [];
    await Promise.all(searchIds.map(async ({ id: tick }) => {
        try {
            let out = await getCoin(tick);
            dataArr.push(out);
        } catch {}
    }));
    res.json({ all: dataArr.slice(0, 20) });
});

app.post('/feedback', async (req, res) => {
    cache.feedback[uuidv4()] = req.body.feedback; // fixed uuid usage
    res.sendStatus(200);
});

const port = process.env.PORT || 3001

app.listen(port, async() => {
    console.log(`app listening on port ${port}`)
}) 

module.exports = { getCoin };
