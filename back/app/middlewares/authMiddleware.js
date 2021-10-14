const jwtService = require('../services/jwtService');
const blacklistService = require('../services/userBlacklistService');

const authorizePass = (req, next) => {
    if (
        req.url === '/api/search/criteria' ||
        req.url === `/api/search/city/${req.params.insee}`
      ) {
        return true;
      }
      return false;
}

// eslint-disable-next-line consistent-return
exports.authMiddleware =
  (isRefresh = false) =>
  // eslint-disable-next-line consistent-return
  async (req, res, next) => {
    try {
      // We get the authorization from request headers
      const { authorization } = req.headers;

      // If Authorization have no value, return error message with status 401
      if (!authorization) {
        if (authorizePass(req)) return next();
        return res.status(401).json({ error: 'No token found' });
      }

      // Extract token from authorization value ('Bearer the-token-here')
      const token = authorization.split(' ')[1];

      // If no token found, return error message with status 401
      if (!token) {
        if (authorizePass(req)) return next();
        return res.status(401).json({ error: 'No token found' });
      }
      // Decode the token
      const decoded = await jwtService.validateToken(token, isRefresh);

      // If decode is null, return error message with status 401
      if (decoded == null) {
        if (authorizePass(req)) return next();
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      if (await blacklistService.getUser(decoded.id)) {
        return res.status(401).json({ error: 'You must to be logged' });
      }

      // If token is valid, we set the user data to the request
      req.user = decoded;

      next();
    } catch (err) {
      res.status(403).json({ error: 'You must be authenticated' });
    }
  };
