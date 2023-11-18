// routes/teachers.js
import express from 'express';
import Teacher from '../model/teacher.js';

const router = express.Router();

// Create a new teacher
router.post('/teachers', async (req, res) => {
  try {
    const { id, name, email, subjects } = req.body;
    const teacher = new Teacher({ id, name, email, subjects });
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a teacher' });
  }
});

// Get all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teachers' });
  }
});

// Get a teacher by ID
router.get('/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findOne({ id });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teacher' });
  }
});

// Update a teacher by ID
router.put('/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeacher = req.body;
    const result = await Teacher.findOneAndUpdate({ id }, updatedTeacher, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the teacher' });
  }
});

// Delete a teacher by ID
router.delete('/teachers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Teacher.findOneAndRemove({ id });
    if (!result) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the teacher' });
  }
});

export default router;
