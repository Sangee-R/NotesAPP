import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditNote = ({ match }) => {
  const noteId = match.params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`/notes/update/${noteId}`)
      .then(response => {
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
      })
      .catch(error => {
        console.error('Error retrieving note:', error);
      });
  }, [noteId]);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedNote = { title, content };

    axios.put(`/api/notes/${noteId}`, updatedNote)
      .then(response => {
        console.log('Note updated:', response.data);
        // Perform any necessary logic, such as updating the note list
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditNote;
