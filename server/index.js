const axios = require('axios');
const express = require('express');
var bodyParser = require('body-parser');
require('express-group-routes');
const uuid = express();

const app = express();

var cors = require('cors'); // cross origin resource sharing , so frontend can talk with this backend
app.use(cors());

const CoinGecko = require('coingecko-api');

const crypto =require('./crypto/ether.js');

const {
    getEthBalance,
    getEthBalances,
    verifyTransaction
} = crypto;

const jobs = require('./jobs.js');
const helpers = require('./helper.js');
const { searchTickers } = helpers;

const data = require("./tickers.json"); //coin info
var tickers = {data}; // wrap in an object

const cache = { feedback: {}}

const coinGeckoClient = new CoinGecko();

const second = 1000;
const minute = 60 * second;

const getCoin = async (token) => {
    if (cache[token]) {
        if (cache[token].timestamp - minute < Date.now()){
            return cache[token]; // not sure if this logic work yet
        }
    }

    const {data} = await coinGeckoClient.coins.fetch(token, {});
    const name = data.name;
    const {image, market_data, links } = data;
    const {current_price} = market_data;

    const out = {image, current_price, links, name,timestamp: Date.now() };

    cache[token] = out;

    return out;

};

const supported = ["ethereum", "bitcoin", "tether"];

//group of api end points with /eth
app.group("/eth", (router) => {

    router.get('/price', async (req, res) => {
        const price =await getCoin("ethereum");
        res.json({price});
    });

    router.post('/balance', async(req, res) => {
        const price =await getCoin("ethereum");
        const balance = await getEthBalance(req.body.acct, price.current_price.usd);
        res.json({balance});
    });

    router.post('/mulBalance', async(req, res) => {
        const price =await getCoin("ethereum");
        const balance = await getEthBalances(req.body.accts, price.current_price.usd);
        res.json({balance})
    });
});

app.group("/payments", (router) => {
    router.post('/create', async(req, res) => {
        let status = "created";
        const { price, info, id } = req.body;

        cache[id] = {price, info, id, status};

        res.json({res: "success"});
    });

    router.post('/get', async(req, res) => {
        const { id } = req.body;

        if (cache[id]){
            res.json({res: "success", body: cache[id]});
        }else {
            res.json({res: "fail"});
        }
    });

    router.post('/complete', async(req, res)=> {
        const {id} = req.body;
        let verify = await verifyTransaction(req.body);

        if (verify == "complete"){
            cache[id] = { ...cache[id], ...req.body, status: verify};
            res.json({res: "success"});
        }else if (verify == "created"){
            res.json({res: "waiting"});
        }else
            res.json({res: "fail"});
    });

});



