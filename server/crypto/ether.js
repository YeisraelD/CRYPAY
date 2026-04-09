// For Web3 v2+
const Web3 = require("web3").default;

const test = true;
const infura_key = test
  ? "https://rinkeby.infura.io/v3/d22e7e2e66a34892a9535b08658dc52e"
  : "https://mainnet.infura.io/v3/d22e7e2e66a34892a9535b08658dc52e";

const web3 = new Web3(infura_key);

module.exports = web3;

/**
 * Get current balance of an Ethereum account converted to USD
 * @param {string} acct - Ethereum address
 * @param {number} price - Current ETH price in USD
 * @returns {number} - Balance in USD
 */
const getEthBalance = async (acct, price) => {
    try {
        let result = await web3.eth.getBalance(acct)
        return Number(web3.utils.fromWei(result, "ether")) * price
    } catch (e) {
        console.log(e)
        return 0;
    }
}

/**
 * Get balances for multiple Ethereum accounts converted to USD
 * @param {string[]} accts - Array of Ethereum addresses
 * @param {number} price - Current ETH price in USD
 * @returns {number[]} - Array of balances in USD
 */
const getEthBalances = async (accts, price) => {
    try {
        return await Promise.all(accts.map(async (acct) => {
            let result = await web3.eth.getBalance(acct)
            return Number(web3.utils.fromWei(result, "ether")) * price
        }))
    } catch (e) {
        console.log(e)
        return 0;
    }
}

/**
 * Verify a transaction on the blockchain
 * @param {object} data - Transaction data from client
 * @returns {string|null} - 'complete', 'fail', or null if not found
 */
const verifyTransaction = async (data) => {
    let res = await web3.eth.getTransactionReceipt(data.transactionHash)
    if (res){
        let status ="complete"
        let checkkeys = ["blockHash", "blockNumber", "from", "gasUsed", "to", "transactionHash" ]
        for (key in checkkeys) {
            if (data[key] != res[key]) {
                status = "fail"
                break;
            }
        }
        return status
    }else {
        return null
    }
}

module.exports = {
    getEthBalance,
    getEthBalances,
    verifyTransaction
}