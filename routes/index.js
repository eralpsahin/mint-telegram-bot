/* Index Route */
const express = require('express');
const {
  commandType,
  replyInvalid,
  replyHelp,
  signIn,
  LTE,
} = require('../lib/command');

const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  const type = commandType(message.text);
  if (type === -1) replyInvalid(message, res);
  if (type < 2) replyHelp(message, res);
  if (type === 2) signIn(message, res);
  if (type === 3) LTE(message, res);
});
module.exports = router;
