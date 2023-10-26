import express from 'express';
import Student from '../model/student.js';

const StudentRouter = express.Router();

// Create a new student
StudentRouter.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    const result = await student.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a student' });
  }
});

// Read all students
StudentRouter.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Update a student
StudentRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = req.body;
    const result = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the student' });
  }
});

// Delete a student
StudentRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the student' });
  }
});

export default StudentRouter;
