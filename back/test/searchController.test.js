const request = require('supertest');
const searchController = require('../app/controllers/searchController');
const app = require('../index');

describe("SearchController - Random",  () => {

    test('Returning array', async () => {
        const res = await request(app).get("/api/search/random");
        expect.arrayContaining(res.text);
    });

    test('Status code 200', async () => {
        const res = await request(app).get("/api/search/random");
        expect(res.statusCode).toEqual(200);
    })
});



