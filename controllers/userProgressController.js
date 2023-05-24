const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProgressData = require('../models/userProgress');

/**
 * @description    create a new progress data record for a user
 * @route         /users/:userId/ProgressData
 * @access        public  , to be converted to private
 */

const postProgressData = async (req, res) => {
    try {
        const userId = req.params.userId; // get the user id from the URL params
        const progressRecord = new ProgressData({
            user: userId,
            smoked: req.body.smoked,
        });
        const savedRecord = await progressRecord.save();
        res.json(savedRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { postProgressData };
