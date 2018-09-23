const request = require('supertest');

const app = require('../app');

// Testing get all menus

describe('GET /menus', () => {
    it('should retreive all menus', (done) => {
        request(app)
            .get('/api/v1/menus')
            .expect(200, done);
    });
});
/**
 * Testing post menu
 */
describe('POST /menus', () => {
    // const menu = {
    //     foodItemName: 'Chicken pizza',
    //     description: 'served with a bottle of yoghout',
    //     itemAmount: 2000,
    // };

    const menuNotpassed = {
        description: 'served with a bottle of yoghout',
        itemAmount: 1500,
    };

    // it('respond with 201 created. menu added successfully', (done) => {
    //     request(app)
    //         .post('/api/v1/menus')
    //         .send(menu)
    //         .expect(201)
    //         .end((err) => {
    //             if (err) return done(err);
    //             done();
    //             return true;
    //         });
    // });

    it('respond menu cannot be created. food item name is required', (done) => {
        request(app)
            .post('/api/v1/menus')
            .send(menuNotpassed)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
                return true;
            });
    });
});


/**
 * Testing get a specific menu
 */

describe('GET /menu/:id', () => {
    // it('respond with menu retrieved successfully', (done) => {
    //     request(app)
    //         .get('/api/v1/menus/1')
    //         .expect(200)
    //         .end((err) => {
    //             if (err) return done(err);
    //             done();
    //         });
    // });
    it('respond with such menu does not exist', (done) => {
        request(app)
            .get('/api/v1/menus/6')
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                done();
                return true;
            });
    });
});

// Testing Edit menu

describe('PUT /menus/:id', () => {
    const menuToEdit = {
        foodItemName: 'Chicken pizza',
        description: 'served with a bottle of yoghout',
        itemAmount: 2000,
    };

    it('respond with 201 created. item updated successfully', (done) => {
        request(app)
            .put('/api/v1/menus/1')
            .send(menuToEdit)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
                return true;
            });
    });
});


describe('DELETE /menus/:id', () => {
    const menuToDelete = {
        foodItemName: 'Chicken pizza',
        description: 'served with a bottle of yoghout',
        itemAmount: 2000,
    };

    it('respond with 200 ok. item deleted successfully', (done) => {
        request(app)
            .delete('/api/v1/menus/1')
            .send(menuToDelete)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
                return true;
            });
    });

    it('respond with such menu does not exist', (done) => {
        request(app)
            .delete('/api/v1/menus/6')
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                done();
                return true;
            });
    });
});
