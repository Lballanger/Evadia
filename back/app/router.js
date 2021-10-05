const { Router } = require('express');

const searchController = require('./controllers/searchController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const { authMiddleware } = require('./middlewares/authMiddleware');
const contactController = require('./controllers/contactController');

const { findByName, findByCriteria } = require('./schemas/commune');
const { validateBody, validateQuery } = require('./services/validator');

const router = Router();

// /search

/**
 * Responds with one city from database on the map
 * @route GET /search/city
 * @group Search
 * @summary Responds with one city from database
 */
router.get(
  '/api/search/city',
  validateQuery(findByName),
  searchController.findByName
);
/**
 * Responds with a city from database
 * @route GET /search/city/:insee
 * @group Search
 * @summary Responds with a city from database
 */
router.get('/api/search/city/:insee', searchController.findByInsee);
/**
 * Responds with one random city from database
 * @route GET /search/random
 * @group Search
 * @summary Responds with one random city from database
 */
router.get('/api/search/random', searchController.randomSearch);
/**
 * Responds with a list of cities matching the criteria
 * @route GET /search/criteria
 * @group Search
 * @summary Responds with a list of cities matching the criteria
 */
router.post(
  '/api/search/criteria',
  authMiddleware(),
  validateBody(findByCriteria),
  searchController.findByCriteria
);

/**
 * Add/Update/Delete the user favorite or blacklist
 * @route GET /search/city/:insee/check
 * @group Search
 * @summary Add/Update/Delete the user favorite or blacklist
 */
router.post(
  '/api/search/city/:insee/check',
  authMiddleware(),
  searchController.addFavorite
);

router.get('/api/messages', contactController.getAll);
router.get('/api/messages/:id', contactController.getOne);
router.post('/api/messages', contactController.create);
router.patch('/api/messages/:id', contactController.update);
router.delete('/api/messages/:id', contactController.delete);

/**
 * Get data for the current connected user
 * @route GET /user
 * @group Auth
 * @summary Return data for the current connected user or error message if not connected with valid token
 */
router.get('/api/user', authMiddleware(), userController.user);

/**
 * Update the current user data
 * @route PUT /user
 * @group Auth
 * @summary Update the current user data
 */
router.patch('/api/user', authMiddleware(), userController.update);

/**
 * Delete the current user from database
 * @route DELETE /user
 * @group Auth
 * @summary Delete the current user from database
 */
router.delete('/api/user', authMiddleware(), userController.delete);

/**
 * Log user in
 * @route POST /auth/login
 * @group Auth
 * @summary Return user data and token if user successfully connected or error message
 */
router.post('/api/auth/login', authController.login);

/**
 * Sign user in
 * @route POST /auth/register
 * @group Auth
 * @summary Return user data and token if user successfully created and if email not already store in the database otherwise return an error message
 */
router.post('/api/auth/register', authController.register);

/**
 * Sign user out
 * @route POST /auth/logout
 * @group Auth
 * @summary Return error message if user was not connected (no token provided or invalid) otherwise return status 204
 */
router.post('/api/auth/logout', authMiddleware(), authController.logout);

router.post(
  '/api/auth/refresh-token',
  authMiddleware(true),
  authController.refreshToken
);

router.post('/api/auth/forgot-password', authController.generatePasswordToken);

router.post(
  '/api/auth/new-password',
  authMiddleware(),
  authController.newPassword
);

module.exports = router;
