const mongoose = require('mongoose');

const contact = mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('contact', contact);
