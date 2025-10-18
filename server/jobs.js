const cron = require('node-core');
const fs = require('fs');

const k = require("./tickers.json");
const { get } = require('http');

// const startCron = (tickers, coinGeckoClient) => {
//     cron.schedule('0 0 * *', async() => {
//         tickers.data =await getTickers(tickers, coinGeckoClient)

//     } );
// }

const getTickers = async(coinGeckoClient) => {
    const out = await coinGeckoClient.coins.list();
    const { data } = out;
    return data
}
module.exports = {
    getTickers,
    //startCron
}
