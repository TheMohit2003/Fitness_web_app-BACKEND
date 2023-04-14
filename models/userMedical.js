const mongoose = require('mongoose');

const MedicalDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name:{
    type:String,
    required:true
  },
  maxCalorie:{
    type:Number,
    required:true
  }
  // other fields related to medical data
});

module.exports = mongoose.model('MedicalData', MedicalDataSchema);
