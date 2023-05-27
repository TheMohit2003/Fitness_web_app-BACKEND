const User = require('../models/userModel');
const MedicalData = require('../models/userMedical');
const Progress = require('../models/userProgress');

const storeMedicalData = async (req, res) => {
    const { age, avgSmoked, height, weight, gender } = req.body;
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
        avgSmoked,
        height,
        weight,
        gender,
        user: userId,
      });
  
      // Save the medicalData instance to the database
      await medicalData.save();
  
      res.status(200).json({ message: 'Medical data stored successfully.' });
    } catch (error) {
      res.status(500).json({
        error: 'An error occurred while storing the medical data.',
      });
    }
  };

  const getMedicalData = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Find the medical data for the user
      const medicalData = await MedicalData.findOne({ user: userId });
  
      // Find the progress data for the user
      const progressData = await Progress.find({ user: userId });
  
      // Calculate perDayCount
      const perDayCount = progressData.reduce((total, progress) => total + progress.smoked, 0);
  
      // Calculate cigarettesNotSmoked
      const ageInYears = medicalData.age;
      const cigarettesNotSmoked = perDayCount * (ageInYears * 365);
  
      // Calculate lungCapacity percentage
      const lungCapacityPercentage = calculateLungCapacityPercentage(user.age, user.gender, user.height, user.weight);
  
      // Calculate diseaseRisk percentage
      const diseaseRiskPercentage = calculateDiseaseRiskPercentage(user.age, user.smoked, user.gender);
  
      // Prepare the response object
      const response = {
        username: user.username,
        email: user.email,
        perDayCount,
        cigarettesNotSmoked,
        lungCapacity: lungCapacityPercentage,
        diseaseRisk: diseaseRiskPercentage,
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the medical data.' });
    }
  };
  
  
  // Function to calculate lung capacity percentage
  const calculateLungCapacityPercentage = (age, gender, height, weight) => {
    let lungCapacityPercentage = 100; // Default value
  
    // Adjust the lung capacity percentage based on age, gender, height, weight, and other relevant factors
    // Replace this logic with your own calculation based on medical knowledge
  
    // Example calculation based on age and gender
    if (age >= 60) {
      lungCapacityPercentage -= 10;
    }
    if (gender === 'female') {
      lungCapacityPercentage -= 5;
    }
  
    return lungCapacityPercentage;
  };
  
  // Function to calculate disease risk percentage
  const calculateDiseaseRiskPercentage = (age, smoked, gender) => {
    let diseaseRiskPercentage = 10; // Default value
  
    // Adjust the disease risk percentage based on age, smoking history, gender, and other relevant factors
    // Replace this logic with your own calculation based on medical knowledge
  
    // Example calculation based on age, smoking history, and gender
    if (age >= 40 && smoked) {
      diseaseRiskPercentage += 10;
    }
    if (gender === 'male') {
      diseaseRiskPercentage += 5;
    }
  
    return diseaseRiskPercentage;
  };

module.exports = { storeMedicalData, getMedicalData };
