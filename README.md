CRYPAY is a cryptocurrency payment gateway and development kit designed to simplify digital asset integration for real-world applications.

### Core Payment Capabilities
- **Eth-to-eBay Bridge**: Facilitating Ethereum payments for conventional platforms.
- **Smart Portfolio Management**: Real-time balance checks across multiple accounts.
- **Dynamic Pricing Engine**: Automated market data synchronization via CoinGecko.

### API Endpoints
- `GET /health` - Server status check
- `GET /version` - Get API version
- `GET /eth/price` - Get current Ethereum price
- `GET /all` - Get prices for all supported coins
- `POST /search` - Search for crypto tickers
- `POST /feedback` - Submit user feedback

---

## Developer Stack

### Backend Environment
- **Node.js & Express**: High-performance API routing.
- **Web3.js**: Direct blockchain interfacing.
- **CoinGecko SDK**: Reliable market intelligence.

### Client Environment
- **TypeScript**: Ensuring type-safe frontend integrations.

---

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

For technical implementation details, security protocols, and data models, please refer to our **[Architecture Guide](file:///c:/Users/yeisr/OneDrive/Desktop/cpay/CRYPAY/docs/ARCHITECTURE.md)**.

---
