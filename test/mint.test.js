const { resolve } = require('path');
const { config } = require('dotenv');
const { login, getData, refreshBearer } = require('../lib/mint');

config({ path: resolve(__dirname, '../.env') });

const conditional =
  !!process.env.TEST_NUMBER &&
  !!process.env.TEST_PASS &&
  !!process.env.TEST_TOKEN
    ? test
    : test.skip;

describe('login', () => {
  conditional('Logins to Mint Mobile', async () => {
    const response = (await login(
      process.env.TEST_NUMBER,
      process.env.TEST_PASS,
    )).data;
    expect(response).toMatchObject({
      id: '896278',
      refreshToken: process.env.TEST_TOKEN,
    });
  });
  test('Login attemp fails', async () => {
    const response = await login('8888888888', null);
    expect(response).toEqual(null);
  });
});

describe('getData', () => {
  conditional('Retrieves LTE stats', async () => {
    const acc = (await login(process.env.TEST_NUMBER, process.env.TEST_PASS))
      .data;
    const response = (await getData(acc.id, acc.token)).data;
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining(['remaining4G', 'usage4G']),
    );
  });
  test('Retrieve attempt fails', async () => {
    const response = await getData('888888', null);
    expect(response).toEqual(null);
  });
});

describe('refreshBearer', () => {
  conditional('Refresh account bearer', async () => {
    const acc = (await login(process.env.TEST_NUMBER, process.env.TEST_PASS))
      .data;
    const response = (await refreshBearer(
      process.env.TEST_NUMBER,
      acc.refreshToken,
    )).data;
    expect(Object.keys(response)).toEqual(expect.arrayContaining(['token']));
  });
  test('Refresh account bearer attempt fails', async () => {
    const response = await refreshBearer('8888888888', null);
    expect(response).toEqual(null);
  });
});
