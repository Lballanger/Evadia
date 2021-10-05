const jwt = require('jsonwebtoken');

const jwtService = {
  /**
   * Function that verify a given token
   * @description Verifies the token
   * @param {string} token
   * @returns {object} Return the decoded token object or null if invalid token
   */
  validateToken: async (token, isRefresh = false) => {
    try {
      const decoded = jwt.verify(
        token,
        isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET
      );
      return decoded;
    } catch (err) {
      return null;
    }
  },
  /**
   * Function that generate a new token with the given payload
   * @param {object} payload Payload data to store in the token
   * @param {boolean} isRefresh If true, it will use the JWT_REFRESH_TOKEN - Default: false (JWT_TOKEN)
   * @returns {string} Return a token
   */
  generateToken: async (payload, isRefresh = false, expirationTime = null) => {
    const expiresIn =
      expirationTime ||
      parseInt(
        isRefresh
          ? process.env.JWT_REFRESH_SECRET_DURATION
          : process.env.JWT_SECRET_DURATION,
        10
      );
    const token = jwt.sign(
      payload,
      isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET,
      {
        expiresIn,
      }
    );
    return token;
  },
};

module.exports = jwtService;
