const Mongoose = require('../utils/mongoose');

const MessageSchema = new Mongoose.Schema({
  channel: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1d'
  },
  contents: {
    type: Array,
    required: true
  }
});

const Message = Mongoose.model('Message', MessageSchema);

module.exports = {
  Model: Message
};
