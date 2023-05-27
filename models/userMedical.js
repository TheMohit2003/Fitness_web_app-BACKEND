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
    avgSmoked: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const MedicalData = mongoose.model('Medical', medicalSchema);

module.exports = MedicalData;
