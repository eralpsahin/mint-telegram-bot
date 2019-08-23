const debug = require('debug')('mtb:redis');
const redis = require('redis');
const { promisify } = require('util');

/**
 * Create Redis Instance.
 */

const redisClient = redis.createClient();

/**
 * Promisify get function of Redis.
 */

redisClient.getAsync = promisify(redisClient.get).bind(redisClient);

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
