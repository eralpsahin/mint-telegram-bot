/* Index Route */
const express = require('express');
const redisClient = require('../redis-client');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.json({ data: 'placeholder' }));

router.post('/', (req, res) => {
  redisClient.set('key', 'value');
  res.send('Redis is working!');
});

module.exports = router;
