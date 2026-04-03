# CRYPAY

## 🌉 Bridging Crypto to Reality

CRYPAY is a robust cryptocurrency payment gateway and development kit designed to simplify digital asset integration for real-world applications.

---

## 🏗 Repository Structure

A high-level overview of the project's organization:

```text
CRYPAY/
├── client/                 # Frontend SDK/Library
│   └── client/             # TypeScript implementation
│       ├── lib/            # Core integration logic (API abstraction)
│       └── types/          # Shared type definitions
├── server/                 # Backend REST API (Node.js/Express)
│   ├── crypto/             # Blockchain & Web3 interaction layer
│   ├── tickers.json        # Pre-loaded cryptocurrency data
│   ├── index.js            # API entry point & route definitions
│   ├── helper.js           # Shared utility functions
│   └── jobs.js             # Automated background tasks
├── docs/                   # Detailed architectural documentation
└── README.md               # You are here
```

---

## 🚀 Key Features

### Core Payment Capabilities
- **Eth-to-eBay Bridge**: Facilitating Ethereum payments for conventional platforms.
- **Smart Portfolio Management**: Real-time balance checks across multiple accounts.
- **Dynamic Pricing Engine**: Automated market data synchronization via CoinGecko.

### API Capabilities
- `GET /eth/price` - Real-time Ethereum market valuation.
- `POST /eth/balance` - Live account balance tracking.
- `POST /search` - Advanced ticker discovery and analysis.
- `POST /payments/create` - Lifecycle management for crypto transactions.

---

## 🛠 Developer Stack

### Backend Environment
- **Node.js & Express**: High-performance API routing.
- **Web3.js**: Direct blockchain interfacing.
- **CoinGecko SDK**: Reliable market intelligence.

### Client Environment
- **TypeScript**: Ensuring type-safe frontend integrations.

---

## 🚦 Getting Started

1. **Service Layer Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env # Configure your environment secrets
   npm run dev
   ```

2. **Integration Layer**
   - Reference the `client/` directory for type-safe API consumers.

---

## 📖 Deep Dive
For technical implementation details, security protocols, and data models, please refer to our **[Architecture Guide](file:///c:/Users/yeisr/OneDrive/Desktop/cpay/CRYPAY/docs/ARCHITECTURE.md)**.

---