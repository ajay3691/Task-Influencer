// routes/marks.js
import express from 'express';
import Mark from '../model/mark.js';
import Student from '../model/student.js';

const router = express.Router();

// Create a new mark for a specific student and subject
router.post('/marks', async (req, res) => {
  try {
    console.log('Received POST request to /marks:', req.body);

    const { studentId,  subject, score } = req.body;

    // Check if the student exists
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      console.error('Student not found');
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if a mark already exists for the given student, teacher, and subject
    const existingMark = await Mark.findOne({ student: studentId, subject });
    if (existingMark) {
      console.error('Mark already exists for the given student and subject');
      return res.status(400).json({ error: 'Mark already exists for the given student and subject' });
    }

    const mark = new Mark({ student: studentId, subject, score });
    const savedMark = await mark.save();

    // Respond without the teacher details
    const response = {
      _id: savedMark._id,
      student: savedMark.student,
      subject: savedMark.subject,
      score: savedMark.score,
    };

    console.log('Mark created successfully:', response);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating a mark:', error);
    res.status(500).json({ error: 'Error creating a mark' });
  }
});


// Get all marks for a specific student
router.get('/marks/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const marks = await Mark.find({ student: studentId });

    // Respond without the teacher details
    const response = marks.map((mark) => ({
      _id: mark._id,
      student: mark.student,
      subject: mark.subject,
      score: mark.score,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching marks' });
  }
});

// Get all marks (for all students)
router.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.find();

    // Respond without the teacher details
    const response = marks.map((mark) => ({
      _id: mark._id,
      student: mark.student,
      subject: mark.subject,
      score: mark.score,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all marks' });
  }
});

// Update a mark by ID
router.put('/marks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMark = req.body;
    const result = await Mark.findByIdAndUpdate(id, updatedMark, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Mark not found' });
    }

    // Respond without the teacher details
    const response = {
      _id: result._id,
      student: result.student,
      subject: result.subject,
      score: result.score,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the mark' });
  }
});

// Delete a mark by ID
router.delete('/marks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Mark.findByIdAndRemove(id);
    if (!result) {
      return res.status(404).json({ error: 'Mark not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the mark' });
  }
});

export default router;
