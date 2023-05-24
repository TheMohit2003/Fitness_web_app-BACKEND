const express = require('express');

const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { postProgressData } = require('../controllers/userProgressController');
const {
    getAllData,
    getSpecificData,
} = require('../controllers/userDataController.js');
const {
    getAllPosts,
    getSpecificPost,
    makeUserPost,
    deleteSpecificPost,
    editSpecificPost,
} = require('../controllers/userPostController.js');

/**
 * @description - the below routes are for authentication and authorization
 */
router.post('/register', registerUser);
router.post('/login', loginUser);

/**
 * @description - the below routes are progress data related to smoking
 */
router.get('/getAllData', getAllData);
router.get('/:userId/getProgressData', getSpecificData);
router.post('/:userId/progressData', postProgressData);

/**
 * @description - the below routes are for posting posts related to user's posts
 */
router.get('/:userId/getPost', getSpecificPost);
router.get('/allUserPost', getAllPosts);
router.post('/:userId/userPost', makeUserPost);
router.delete('/:postId/post', deleteSpecificPost);
router.put('/:postId/post', editSpecificPost);

module.exports = router;
