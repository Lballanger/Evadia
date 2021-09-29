const { get } = require('../redis_client');

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
};

module.exports = userBlacklistService;
