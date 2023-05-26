const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    age: {
        type: Number,
        required: true,
    },
    smoked: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Medical', medicalSchema);

module.exports = Post;
