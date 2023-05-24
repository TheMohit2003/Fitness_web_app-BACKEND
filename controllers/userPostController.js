const Post = require('../models/userPost');
const User = require('../models/userModel');

/**
 * @description Get all posts
 * @route GET /userPost
 */
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @description Get specific post for a user
 * @route GET /:userId/getPost
 * @param {string} userId - The ID of the user
 */
const getSpecificPost = async (req, res) => {
    const userId = req.params.userId;
    try {
        const post = await Post.findOne({ user: userId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @description Create a user post
 * @route POST /:userId/userPost
 * @param {string} userId - The ID of the user
 * @body {string} title - The title of the post
 * @body {string} content - The content of the post
 */
const makeUserPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.params.userId;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = new Post({
            user: userId,
            title,
            content,
            author: user.username, // Fetch author from the user database
        });

        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @description Delete a specific post
 * @route DELETE /post/:postId
 * @param {string} postId - The ID of the post
 */
const deleteSpecificPost = async (req, res) => {
    const postId = req.params.postId;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @description Edit a specific post
 * @route PUT /post/:postId
 * @param {string} postId - The ID of the post
 * @body {string} title - The updated title of the post
 * @body {string} content - The updated content of the post
 */
const editSpecificPost = async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPosts,
    getSpecificPost,
    makeUserPost,
    deleteSpecificPost,
    editSpecificPost,
};
