const User = require('../models/userModel');
const MedicalData = require('../models/userMedical');

const storeMedicalData = async (req, res) => {
  const age = req.body.age;
  const smoked = req.body.smoked;
  const userId = req.params.userId;

  try {
    // Check if there is existing medical data for the user
    const existingData = await MedicalData.findOne({ user: userId });

    if (existingData) {
      // Medical data already exists for the user, do not change it
      return res.status(200).json({ message: 'Medical data already stored.' });
    }

    // Create a new instance of the MedicalData model and populate it with the provided data
    const medicalData = new MedicalData({
      age,
      smoked,
      user: userId,
    });

    // Save the medicalData instance to the database
    await medicalData.save();

    res.status(200).json({ message: 'Medical data stored successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while storing the medical data.' });
  }
};

module.exports = { storeMedicalData };
