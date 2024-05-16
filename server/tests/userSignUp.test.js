const request = require('supertest');
const mongoose = require('mongoose')

let app;

describe('User Signup', () => {
    
    beforeEach(() => {
        app = require("../server");
      })
    

      afterEach(async() => {
        app.close();
        await mongoose.connection.close()
      });
    it('should sign up a new user', async () => {
        const currentDate = new Date().toISOString().slice(5, 19).replace(/[-T:]/g, ''); // Format: MMDDhhmm
        const res = await request(app)
            .post('/user/signUser')
            .send({
                userName: 'testuser'+currentDate,
                userPassword: 'testpassword',
                userFullName: 'Test User',
                userEmail: 'test'+currentDate+'@example.com',
                userPhoneNumber: '1234567890',
                userProfilePicPath: '/path/to/profilepic',
                userSummary: 'Test user summary'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });

    it('should sign up an exisiting user', async () => {
        const currentDate = new Date().toISOString().slice(5, 19).replace(/[-T:]/g, ''); // Format: MMDDhhmm
        const res = await request(app)
            .post('/user/signUser')
            .send({
                userName: 'testuser'+currentDate,
                userPassword: 'testpassword',
                userFullName: 'Test User',
                userEmail: 'test'+currentDate+'@example.com',
                userPhoneNumber: '1234567890',
                userProfilePicPath: '/path/to/profilepic',
                userSummary: 'Test user summary'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('error');

    });

    it('should return error for missing required fields during signup', async () => {
        const res = await request(app)
            .post('/user/signUser')
            .send({
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
