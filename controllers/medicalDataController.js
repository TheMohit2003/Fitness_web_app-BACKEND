const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const MedicalData = require('../models/userMedical');

/**
 * @description    create a new medical record for a user
 * @route         /users/:userId/medicalData
 * @access        public  , to be converted to private
 */

const postMedicalData = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId; // get the user id from the URL params
        const medicalRecord = new MedicalData({
            // height: req.body.height,
            user: userId,
            name:req.body.name,
            maxCalorie:req.body.maxCalorie
            // weight: req.body.weight,
            // age: req.body.age,
            // gender: req.body.gender,
            // other fields related to medical data
        });
        const savedRecord = await medicalRecord.save();
        res.json(savedRecord);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = { postMedicalData };
