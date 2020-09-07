const axios = require('axios');
const debug = require('debug')('mtb:command');
const redisClient = require('../redis-client');
const { getAsync } = require('../redis-client');

const { login, getData, refreshBearer } = require('../lib/mint');

const Command = () => {
  const commands = ['/start', '/help', '/signin', '/lte'];
  const commandType = (text) => commands.indexOf(text.split(' ')[0]);

  const replyInvalid = (message, res) => {
    axios
      .post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
        chat_id: message.chat.id,
        text: 'Unrecognized command. /help to get help.',
      })
      .then(() => {
        // We get here if the message was successfully posted
        debug('Invalid message reply sent.');
        res.end('ok');
      })
      .catch((err) => {
        // ...and here if it was not
        debug('Error :', err);
        res.end(`Error :${err}`);
      });
  };

  const replyHelp = (message, res) => {
    axios
      .post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
        chat_id: message.chat.id,
        text:
          '/signin <number> <password> - Sign in to Mint Mobile\n/lte - Get LTE data',
      })
      .then(() => {
        // We get here if the message was successfully posted
        debug('Help reply sent.');
        res.end('ok');
      })
      .catch((err) => {
        // ...and here if it was not
        debug('Error :', err);
        res.end(`Error :${err}`);
      });
  };

  const signIn = async (message, res) => {
    const { id } = message.from;
    const credentials = message.text.split(' ').slice(1);
    const resp = await login(credentials[0], credentials[1]);
    let text =
      'Signin failed. Make sure you enter your\
       Mint Mobile number and password.';
    if (resp !== null) {
      [resp.data.number] = credentials;
      redisClient.set(id, JSON.stringify(resp.data));
      text = 'Signed in successfully! Get your data with /lte.';
    }
    axios
      .post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
        chat_id: message.chat.id,
        text,
      })
      .then(() => {
        // We get here if the message was successfully posted
        debug('Signin reply sent.');
        res.end('ok');
      })
      .catch((err) => {
        // ...and here if it was not
        debug('Error in signIn :', err);
        res.end(`Error :${err}`);
      });
  };

  const LTE = async (message, res) => {
    const acc = JSON.parse(await getAsync(message.from.id));
    let resp = await getData(acc.id, acc.token);
    if (resp === null) {
      // Refresh token and get data
      const refresh = await refreshBearer(acc.number, acc.refreshToken);
      acc.token = refresh.data.token;
      redisClient.set(message.from.id, JSON.stringify(acc));
      resp = await getData(acc.id, acc.token);
    }
    axios
      .post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
        chat_id: message.chat.id,
        text: `*Remaining*:    ${(resp.data.remaining4G / 1000).toFixed(
          2,
        )}GB\n*Used*:             ${(resp.data.usage4G / 1000).toFixed(2)}GB`,
        parse_mode: 'markdown',
      })
      .then(() => {
        // We get here if the message was successfully posted
        debug('LTE reply sent.');
        res.end('ok');
      })
      .catch((err) => {
        // ...and here if it was not
        debug('Error in LTE :', err);
        res.end(`Error :${err}`);
      });
  };

  return {
    commandType,
    replyInvalid,
    replyHelp,
    signIn,
    LTE,
  };
};

module.exports = Command();
