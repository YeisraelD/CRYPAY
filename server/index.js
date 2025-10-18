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


