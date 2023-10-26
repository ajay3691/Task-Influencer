import express from 'express';
import Teacher from '../model/teacher.js';

const TeacherRouter = express.Router();

// Create a new teacher
TeacherRouter.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const result = await teacher.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a teacher' });
  }
});

// Read all teachers
TeacherRouter.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching teachers' });
  }
});

// Update a teacher
TeacherRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeacher = req.body;
    const result = await Teacher.findByIdAndUpdate(id, updatedTeacher, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the teacher' });
  }
});

// Delete a teacher
TeacherRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Teacher.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the teacher' });
  }
});

export default TeacherRouter;
