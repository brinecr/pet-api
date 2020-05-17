const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Pet', petSchema)
