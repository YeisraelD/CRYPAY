# CRYPAY
## Connecting Cryptocurrencies to the Real World

### Features
- Eth Payments on Ebay
- Search Crypto Prices
- Share to friends

### Quick Start
1. `cd server`
2. `npm install`
3. `cp .env.example .env` (Configure your environment)
4. `npm run dev`

### API Endpoints
- `GET /health` - Server status check
- `GET /version` - Get API version
- `GET /eth/price` - Get current Ethereum price
- `GET /all` - Get prices for all supported coins
- `POST /search` - Search for crypto tickers
- `POST /feedback` - Submit user feedback

### Features in Development
- Eth Payments via PayPal
- Frontend integration

---