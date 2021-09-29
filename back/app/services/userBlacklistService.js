const { get, set } = require('../redis_client');

const userBlacklistService = {
  getUser: async (id) => {
    try {
      const user = await get(`blacklist:user:${id}`);
      if (user) return true;
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
  addInBlacklist: async (id) => {
    try {
      return await set(`blacklist:user:${id}`, 1);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};

module.exports = userBlacklistService;
