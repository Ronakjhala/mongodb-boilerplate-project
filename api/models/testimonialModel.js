const mongoose = require('mongoose');

const testimonial = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  testimonialtype: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  testimonialdescription: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Testimonial', testimonial);
