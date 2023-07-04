const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort('-createdAt');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving notes' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Error updating note' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting note' });
  }
};