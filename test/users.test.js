// Supertest to test HTTP requests/responses
const request = require('supertest');
// Need to require app for routes
const app = require('../app');

describe('GET /users ', () => {
  test('It should respond with a placeholder users array', async () => {
    const response = await request(app).get('/users');
    expect(response.body).toEqual(['Eralp', 'Sahin']);
    expect(response.statusCode).toBe(200);
  });
});
