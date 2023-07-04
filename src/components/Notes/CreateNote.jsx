import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const newNote = { title, content };

    axios.post('/notes/create', newNote)
      .then(response => {
        console.log('Note created:', response.data);
        // Perform any necessary logic, such as updating the note list
      })
      .catch(error => {
        console.error('Error creating note:', error);
      });

    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Create Note</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateNote;
