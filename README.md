# CRYPAY - Crypto Payment Gateway API

![CRYPAY Badge](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-ISC-orange)

**CRYPAY** is a robust, lightweight cryptocurrency payment gateway and dashboard API built with Node.js and Express. It provides real-time tracking of crypto prices, balance verification, and a streamlined workflow for creating and verifying payments across multiple blockchains.

---

## Features

- **Real-time Market Data**: Instant access to live prices for Ethereum, Bitcoin, Tether, and thousands of other assets via CoinGecko integration.
- **On-Chain Balance Checking**: Built-in support for fetching Ethereum balances for single or multiple addresses.
- **Payment Lifecycle Management**:
  - `POST /payments/create`: Generate a new payment request.
  - `POST /payments/complete`: Verify and finalize transactions.
- **Smart Caching**: Optimized performance with time-based caching for price data to minimize API calls.
- **Search & Filter**: Find tokens quickly using the built-in ticker search utility.
- **Developer-Friendly**:
  - Global error handling.
  - Health checks and versioning endpoints.
  - Basic security hardening headers included.

---

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) / [Express](https://expressjs.com/)
- **Blockhain Support**: [Web3.js](https://web3js.org/)
- **Market Data**: [CoinGecko API](https://www.coingecko.com/en/api)
- **Utilities**: Axios, UUID, Body-Parser, CORS

---

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

---

## API Reference

### Ethereum
- `GET /eth/price` - Get the current price of ETH.
- `POST /eth/balance` - Get balance for a specific address.
- `POST /eth/mulBalance` - Get balances for multiple addresses.

### Payments
- `POST /payments/create` - Initialize a payment.
- `POST /payments/get` - Retrieve payment details by ID.
- `POST /payments/complete` - Finalize and verify a payment.

### General
- `GET /health` - Check API connectivity.
- `GET /version` - Check application version.
- `POST /search` - Search for tokens by name/ticker.

