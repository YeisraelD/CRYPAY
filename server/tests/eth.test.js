const request = require('supertest');
const app = require('../app');

// Mock external dependencies
jest.mock('coingecko-api');
jest.mock('axios');

describe('Ethereum API Endpoints', () => {
    
    test('GET /eth/price should return 200 and price data', async () => {
        const response = await request(app).get('/eth/price');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('price');
        expect(response.body.price).toHaveProperty('current_price');
    });

    test('POST /eth/balance should return 200 and balance info', async () => {
        const payload = { acct: '0x1234567890123456789012345678901234567890' };
        const response = await request(app)
            .post('/eth/balance')
            .send(payload);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('balance');
    });

    test('POST /eth/balance should return 400 for invalid address', async () => {
        const payload = { acct: '' }; // Invalid
        const response = await request(app)
            .post('/eth/balance')
            .send(payload);
        
        expect(response.statusCode).toBe(400);
    });
});
