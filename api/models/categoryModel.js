const mongoose = require('mongoose');

const category = mongoose.Schema({
  // ID:{
  //     type:Number,
  //     required:true
  // },
  categoryname: {
    type: String,
    required: true,
  },
  categorytype: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', category);
