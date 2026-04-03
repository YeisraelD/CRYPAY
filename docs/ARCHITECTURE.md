# CRYPAY Architecture Overview

This document provides a detailed technical breakdown of the CRYPAY system, its components, and their interactions.

## Backend Architecture (`/server`)

The backend is built as a lightweight, performant REST API using **Node.js** and **Express**.

### 1. API Entry Point (`index.js`)
- **Routing**: Organizes routes into functional groups (e.g., `/eth`, `/payments`).
- **Caching**: Implements a simple in-memory TTL (Time-To-Live) cache for CoinGecko prices to minimize API rate limiting and improve response times.
- **Security**: Includes basic HTTP security headers (nosniff, DENY, etc.) and uses `cors` for safe cross-origin resource sharing.

### 2. Blockchain Interaction Layer (`/crypto/ether.js`)
- **Engine**: Powered by **Web3.js**.
- **Functionality**: 
  - Retrieves live Ethereum balances.
  - Verifies transaction receipts from the blockchain.
  - Switches between Mainnet and Testnets (Infura integration).

### 3. Data Intelligence (`helper.js` & `tickers.json`)
- **Ticker Search**: Implements a custom binary search algorithm to efficiently find cryptocurrency tickers among thousands of entries.
- **Data Source**: Uses a local `tickers.json` for rapid lookups, supplemented by CoinGecko for live market data.

### 4. Background Processing (`jobs.js`)
- **Automation**: Designed to handle periodic data refreshes (e.g., updating the local ticker list).

---

## Client Architecture (`/client`)

The client side is structured as a typed library to facilitate seamless frontend integration.

### 1. API Abstraction (`client/lib/api.ts`)
- Provides a clean, TypeScript-safe interface for interacting with the CRYPAY backend API.

### 2. Shared Definitions (`client/types/crypto.ts`)
- Defines robust TypeScript interfaces for crypto data, ensuring type consistency across the entire stack.

---

## System Interaction Flow

1. **Request**: A frontend client sends a request to the server (e.g., "What's the balance of account X?").
2. **Logic**: `index.js` receives the request and calls methods in `/crypto/ether.js`.
3. **Execution**: `ether.js` communicates with the Ethereum blockchain via Infura.
4. **Data Enrichment**: Results are often paired with current market prices fetched from the in-memory cache.
5. **Response**: The server returns a structured JSON response to the client.

---

##  Security Principles
- **Environment Isolation**: Uses `.env` for sensitive configurations (Infura keys, ports).
- **Validation**: Incoming requests are processed through `body-parser`.
- **Infrastructure**: Designed for stateless scaling.
