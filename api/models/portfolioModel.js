const mongoose = require('mongoose');

const portfolio = mongoose.Schema({
  projectCategory: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  projectDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('portfolio', portfolio);
