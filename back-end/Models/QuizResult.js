// models/QuizResult.js
const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
  studentName: String,
  responses: [Number], // Assuming numerical encoding of responses
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
