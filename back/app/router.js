const { Router } = require('express');

const searchController = require('./controllers/searchController');

const router = Router();

// /search

/**
 * Responds with one city from database
 * @route GET /search/city
 * @group Search
 * @summary Responds with one city from database
 */
router.get('/api/search/city', searchController.findByName);
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
router.post('/api/search/criteria', searchController.findByCriteria);

// /city

// /auth

module.exports = router;
