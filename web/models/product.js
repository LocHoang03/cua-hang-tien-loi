const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Type',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', Product);
