const express = require('express');

const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { postMedicalData } = require('../controllers/medicalDataController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/:userId/medicaldata', postMedicalData);

module.exports = router;
