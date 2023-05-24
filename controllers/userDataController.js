const User = require('../models/userModel');
const ProgressData = require('../models/userProgress');

const getAllData = async (req, res) => {
    try {
        const allData = await ProgressData.find();
        res.json(allData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSpecificData = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if the user exists
        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Retrieve specific data for the user
        const specificData = await ProgressData.findOne({
            user: userId,
        }).populate('user');
        if (!specificData) {
            return res
                .status(404)
                .json({ error: 'Data not found for the user' });
        }

        res.json(specificData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAllData, getSpecificData };
