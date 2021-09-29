const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

const asyncClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  setex: promisify(client.setex).bind(client),
  del: promisify(client.del).bind(client),
  exists: promisify(client.exists).bind(client),
};

module.exports = asyncClient;
