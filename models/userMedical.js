const mongoose = require('mongoose');

const MedicalDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    age: {
        type: Number,
        required: true,
    },
    illness: {
        type: String,
        required: true,
    },
    allergy:{
        type:String,
        required:true,
    }
    // other fields related to medical data
});

module.exports = mongoose.model('MedicalData', MedicalDataSchema);
