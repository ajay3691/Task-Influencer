// server/routes/marks.routes.js
import express from 'express';
import Mark from '../model/mark.js';

const MarkRouter = express.Router();

// Create a new mark
MarkRouter.post('/', async (req, res) => {
  try {
    const mark = new Mark(req.body);
    const result = await mark.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a mark' });
  }
});

// Read all marks
MarkRouter.get('/', async (req, res) => {
  try {
    const marks = await Mark.find();
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching marks' });
  }
});

// Update a mark
MarkRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMark = req.body;
    const result = await Mark.findByIdAndUpdate(id, updatedMark, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Mark not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the mark' });
  }
});

// Delete a mark
MarkRouter.delete('/:id', async (req, res) => {
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

export default MarkRouter;
