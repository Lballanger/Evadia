const { get, set, del, exists } = require('../redis_client');

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
  removeFromBlacklist: async (id) => {
    try {
      if (!(await exists(`blacklist:user:${id}`))) {
        return;
      }
      await del(`blacklist:user:${id}`);
      return;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = userBlacklistService;
