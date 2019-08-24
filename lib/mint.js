const axios = require('axios');
const debug = require('debug')('mtb:mint-API');

const Mint = () => {
  const bearer =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDc3NjY4MjQsIm5iZiI6\
MTUwNzc2NjgyNCwiZXhwIjoxNTk0MDgwNDI0LCJhdWQiOiJNaW50QXBwIiwiaXNzIjoiV\
UxUUkEifQ.r909IZmcavEhqvZO0td_-Ts_q27BBk4cCbFRXpDBQUM';

  const instance = axios.create({
    baseURL: 'https://api.mintsim.com/v1/mint/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer}`,
    },
  });

  const login = async (number, password) => {
    const data = {
      msisdn: number,
      password,
    };
    try {
      const response = await instance.post('login', data);
      return response;
    } catch (e) {
      debug(`Login failed: ${number}`); // 30
      return null;
    }
  };

  const getData = async (accID, accBearer) => {
    // Building request with config for the header
    try {
      const response = await instance({
        method: 'get',
        url: `account/${accID}/data`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accBearer}`,
        },
      });
      return response;
    } catch (e) {
      debug(`getData failed: ${accID}`); // 30
      return null;
    }
  };

  const refreshBearer = async (number, token) => {
    const data = {
      msisdn: number,
      refreshToken: token,
    };
    try {
      const response = await instance.post('refresh', data);
      return response;
    } catch (e) {
      debug(`refreshBearer failed: ${number}`);
      return null;
    }
  };

  return {
    login,
    getData,
    refreshBearer,
  };
};

module.exports = Mint();
