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




