
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
});

const ThreadSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  threadId: { type: String, required: true, unique: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Thread', ThreadSchema);
