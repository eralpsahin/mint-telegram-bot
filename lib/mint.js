const axios = require('axios');

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

    const response = await instance.post('login', data);
    return response;
  };

  const getData = async (accID, accBearer) => {
    // Building request with config for the header
    const response = await instance({
      method: 'get',
      url: `account/${accID}/data`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accBearer}`,
      },
    });
    return response;
  };

  const refreshBearer = async (number, token) => {
    const data = {
      msisdn: number,
      refreshToken: token,
    };

    const response = await instance.post('refresh', data);
    return response;
  };

  return {
    login,
    getData,
    refreshBearer,
  };
};

module.exports = Mint();
