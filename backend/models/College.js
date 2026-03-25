const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  cutoffRank: {
    type: Number,
    required: true
  },
  fees: {
    type: String,
    required: true
  },
  hostelBoys: {
    type: Boolean,
    default: false
  },
  hostelGirls: {
    type: Boolean,
    default: false
  },
  transportation: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);