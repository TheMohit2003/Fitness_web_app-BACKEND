const express = require('express');

const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { postMedicalData } = require('../controllers/medicalDataController');

router.get('/', () => {
    res.status(201).json({
        msg: 'this is the get request for backend api and it is working, kindly post',
    });
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/:userId/medicaldata', postMedicalData);

module.exports = router;
