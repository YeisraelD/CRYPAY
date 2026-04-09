const request = require('supertest');
const app = require('../app');

describe('Payment Transaction Endpoints', () => {
    
    const samplePayment = {
        price: 0.05,
        info: { item: "Coffee", customer: "Alice" },
        id: "pay_" + Date.now()
    };

    test('POST /payments/create should initialize a payment', async () => {
        const response = await request(app)
            .post('/payments/create')
            .send(samplePayment);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.res).toBe('success');
    });

    test('POST /payments/get should retrieve payment info', async () => {
        const response = await request(app)
            .post('/payments/get')
            .send({ id: samplePayment.id });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.res).toBe('success');
        expect(response.body.body.price).toBe(samplePayment.price);
    });

    test('POST /payments/get should fail for non-existent ID', async () => {
        const response = await request(app)
            .post('/payments/get')
            .send({ id: 'non_existent_id' });
        
        expect(response.statusCode).toBe(200); // API returns 200 with res: "fail"
        expect(response.body.res).toBe('fail');
    });
});
