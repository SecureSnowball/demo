const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isVirtual: {
    type: Boolean,
    requierd: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('event', schema);
