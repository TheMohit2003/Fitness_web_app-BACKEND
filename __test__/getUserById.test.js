const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

describe('User Authentication Tests', () => {
    let testUser;
    let testToken;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        await User.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('testpassword', salt);

        testUser = await User.create({
            username: 'testuser',
            email: 'testuser@test.com',
            password: hashedPassword,
        });

        testToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/users', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    username: 'newuser',
                    email: 'newuser@test.com',
                    password: 'newpassword',
                })
                .expect(201);

            expect(response.body.username).toBe('newuser');
            expect(response.body.email).toBe('newuser@test.com');
            expect(response.body).toHaveProperty('token');
        });

        it('should not register a user with incomplete fields', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    username: 'incompleteuser',
                    password: 'incompletepassword',
                })
                .expect(400);

            expect(response.error.text).toContain('please add all fields');
        });

        it('should not register a user with an existing email', async () => {
            const response = await request(app)
                .post('/api/users')
                .send({
                    username: 'existinguser',
                    email: 'testuser@test.com',
                    password: 'existingpassword',
                })
                .expect(400);

            expect(response.error.text).toContain('user already exists');
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in a user with correct email and password', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({ email: 'testuser@test.com', password: 'testpassword' })
                .expect(200);

            expect(response.body.email).toBe('testuser@test.com');
            expect(response.body).toHaveProperty('token');
        });

        it('should not log in a user with incorrect email or password', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({ email: 'testuser@test.com', password: 'wrongpassword' })
                .expect(401);

            expect(response.error.text).toContain('Invalid email or password');
        });
    });
});
