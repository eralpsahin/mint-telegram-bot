// Supertest to test HTTP requests/responses
const request = require('supertest');
// Need to require app for routes
const app = require('../app');

describe('GET / ', () => {
  test('It should respond with a placeholder JSON', async () => {
    const response = await request(app).get('/');
    expect(response.body).toEqual({ data: 'placeholder' });
    expect(response.statusCode).toBe(200);
  });
});
