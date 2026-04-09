const request = require('supertest');
const app = require('../app');

describe('Health & Version Endpoints', () => {
    
    test('GET /health should return 200 and status up', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('up');
        expect(response.body).toHaveProperty('uptime');
    });

    test('GET /version should return 200 and a version string', async () => {
        const response = await request(app).get('/version');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('version');
        expect(response.body).toHaveProperty('env');
    });
});
