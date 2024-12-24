const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a to-do
router.post('/', async (req, res) => {
  try {
    if (!req.body.title) throw new Error('Title is required');
    const newTodo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(400).json({ message: error.message });
  }
});


// Update a to-do
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a to-do
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
