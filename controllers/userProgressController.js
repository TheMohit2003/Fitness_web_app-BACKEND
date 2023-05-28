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

    // Check if progress data for the current day already exists
    const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    const existingData = await ProgressData.findOne({
      user: userId,
      created_at: { $gte: today, $lt: new Date(today).setDate(new Date(today).getDate() + 1) },
    });

    if (existingData) {
      return res.status(400).json({ error: 'Progress data for today already exists' });
    }

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
