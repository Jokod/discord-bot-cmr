const mongoose = require('mongoose');

const Operation = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  operation_id: {
    type: String,
    required: true,
    unique: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  date: String,
  time: String,
  duration: Number,
  description: String,
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Operation', Operation);
