// routes/students.js
import express from 'express';
import Student from '../model/student.js';

const router = express.Router();

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const { id, name, age, className } = req.body;
    const student = new Student({ id, name, age, class: className });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a student' });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Get a student by ID
router.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});

// Update a student by ID
router.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = req.body;
    const result = await Student.findOneAndUpdate({ id }, updatedStudent, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the student' });
  }
});

// Delete a student by ID
router.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findOneAndRemove({ id });
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the student' });
  }
});

export default router;
