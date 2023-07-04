import React from 'react';
import axios from 'axios';

const DeleteNote = ({ match }) => {
  const noteId = match.params.id;

  const handleDelete = () => {
    axios.delete(`/notes/delete/${noteId}`)
      .then(response => {
        console.log('Note deleted:', response.data);
        // Perform any necessary logic, such as updating the note list
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  return (
    <div>
      <h2>Delete Note</h2>
      <p>Are you sure you want to delete this note?</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteNote;
