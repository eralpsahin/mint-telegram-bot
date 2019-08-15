const debug = require('debug')('mtb:redis');
const redis = require('redis');

/**
 * Create Redis Instance.
 */

const redisClient = redis.createClient();

/**
 * Event listener for Redis "error" event.
 */

redisClient.on('error', (err) => {
  debug(`Redis Error ${err}`);
  process.exit(1);
});

/**
 * Event listener for Redis "connect" event.
 */

redisClient.on('connect', () => {
  debug('Redis client is connected.');
});

module.exports = redisClient;
