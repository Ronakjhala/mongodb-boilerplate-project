const mongoose = require('mongoose');
const Joi = require('joi');

const user = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Users', user);
