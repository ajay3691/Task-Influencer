// mark.model.js
import mongoose from 'mongoose';

const markSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const Mark = mongoose.model('Mark', markSchema);

export default Mark;
