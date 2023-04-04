const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Generate Token

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1200',
    });

// @description  register new users
// @route        POST /api/users
// @access       Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('please add all fields');
    }

    // check if the user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('user already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('invalid user data');
    }
});

// @description  authenticate new users
// @route        POST /api/users/login
// @access       Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check for user and password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

module.exports = { registerUser, loginUser };
