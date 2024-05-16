const request = require('supertest');
const mongoose = require('mongoose')
const User = require("../models/users");
const bcrypt = require("bcrypt");

let app;

describe('User Login', () => {
    beforeEach(() => {
        app = require("../server");
      })
    
    afterEach(async() => {
        app.close();
        await mongoose.connection.close()
      });
    it('should login existing user', async () => {
        await request(app)
        .post('/user/signUser')
        .send({
            userName: 'testLoginUser',
            userPassword: 'testLoginUser',
            userFullName: 'Test Login User',
            userEmail: 'testlogin@example.com',
            userPhoneNumber: '1234567890',
            userProfilePicPath: '/path/to/profilepic',
            userSummary: 'Test login user summary'
        });
        const res = await request(app)
            .post('/user/loginUser')
            .send({
                userName: 'testLoginUser',
                userPassword: 'testLoginUser'
            });
            console.log(res.error);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    });

    it('should return error for invalid credentials during login', async () => {
        const res = await request(app)
            .post('/user/loginUser')
            .send({
                userName: 'nonexistentuser',
                userPassword: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('error');
    });

    it('should return error for missing required fields during login', async () => {
        const res = await request(app)
            .post('/user/loginUser')
            .send({
                // Missing required fields
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should return error for user not found', async () => {
        User.findOne = jest.fn();
        User.findOne.mockResolvedValueOnce(undefined);

        const res = await request(app)
            .post('/user/loginUser')
            .send({
               userName: 'nonexistentuser',
               userPassword: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });

    it('should return error for password error', async () => {
        User.findOne = jest.fn();
        User.findOne.mockResolvedValueOnce({userName: 'existentuser'});
        bcrypt.compare = jest.fn();
        bcrypt.compare.mockResolvedValueOnce(undefined);

        const res = await request(app)
            .post('/user/loginUser')
            .send({
               userName: 'existentuser',
               userPassword: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
    });
});