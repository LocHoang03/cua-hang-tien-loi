const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Type = new Schema({
  nametype: {
    type: String,
    required: true,
    unique: true,
  },
  vntype: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Type', Type);
