import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
