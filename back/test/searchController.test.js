const request = require('supertest');
const searchController = require('../app/controllers/searchController');
const app = require('../index');



describe("TEST - SearchController", () => {
    test("should respond with a 200 status code", (done) => {
        request(app)
        .get("/api/search/random")
        .expect("Content-Type", /json/)
        .expect(200, done)
    });
});

