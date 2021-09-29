const redis = require('redis');
const { promisify } = require('util');

const options = {
  host: 'localhost',
  port: '6379',
};

if (process.env.NODE_ENV === 'production') {
  options.host = process.env.REDIS_HOST;
  options.password = process.env.REDIS_PASSWORD;
}

const client = redis.createClient(options);

const asyncClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  setex: promisify(client.setex).bind(client),
  del: promisify(client.del).bind(client),
  exists: promisify(client.exists).bind(client),
};

module.exports = asyncClient;
