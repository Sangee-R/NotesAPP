import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from "../../../context/userContext";

const NotePage = () => {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [databaseContent, setDatabaseContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteData, setSelectedNoteData] = useState({});
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/notes/notes');
      setNotes(response.data);
      setDatabaseContent(response.data.content);
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }
  };

  const createNote = async () => {
    try {
      const response = await axios.post('/notes/notes', {
        title,
        content,
      });
      setNotes([...notes, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/notes/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      setSelectedNote(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const selectNote = (note) => {
    setSelectedNoteData(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setShowModal(true);
  };

  const updateNote = async (id) => {
    try {
      await axios.put(`/notes/notes/${id}`, {
        title: editedTitle,
        content: editedContent,
      });
      fetchNotes();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='Hi-user'>
        {!!user && <h3>Hello {user.name}!</h3>}
      </div>
      <div className='parent-div'>
        <div className='left-child-div'>
          <h3>Add New Note</h3>
          <fieldset className='setTitle'>
            <legend htmlFor="title">Title</legend>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className='addContent'>
            <legend htmlFor="content">Write a note</legend>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </fieldset>
          <button className='save-btn' onClick={createNote}>Save</button>
        </div>
        <div className='vl'></div>
        <div className={`right-child-div ${showModal ? 'blur' : ''}`}>
          <div className='centered-content'>
            <h3>My Notes<svg width="20px" height="20px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#03025d"><path d="M8 14h8M8 10h2M8 18h4M10 3H6a2 2 0 00-2 2v15a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-3.5M10 3V1m0 2v2" stroke="#03025d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></h3>
            <div className='hl'></div>
            <div>
              {notes.map((note) => (
                <div className='note-title' key={note._id}>
                  <h6 onClick={() => selectNote(note)}>{note.title}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Box */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <input
              className='modal-input'
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className='modal-input'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='modal-button-row'>
              <button className='modal-update-btn' onClick={() => updateNote(selectedNoteData._id)}>Update<svg width="16px" height="16px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#218331"><path d="M3 21h18M12.222 5.828L15.05 3 20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l5.607-5.607m-4.95-4.95l4.95 4.95" stroke="#218331" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></svg> </button>
              <button className='modal-delete-btn' onClick={() => deleteNote(selectedNoteData._id)}>Delete<svg width="16px" height="16px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ed0c0c"><path d="M8.992 13h6" stroke="#ed0c0c" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.04 4.294a.496.496 0 01.191-.479C3.927 3.32 6.314 2 12 2s8.073 1.32 8.769 1.815a.496.496 0 01.192.479l-1.7 12.744a4 4 0 01-1.98 2.944l-.32.183a10 10 0 01-9.922 0l-.32-.183a4 4 0 01-1.98-2.944l-1.7-12.744zM3 5c2.571 2.667 15.429 2.667 18 0" stroke="#ed0c0c" stroke-width="1"></path></svg></button>
              <button className='modal-close-btn' onClick={closeModal}>Close<svg width="16px" height="16px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#2340b3"><path d="M3 17V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#2340b3" stroke-width="1"></path><path d="M10 14.243l2.121-2.122m0 0L14.243 10m-2.122 2.121L10 10m2.121 2.121l2.122 2.122M6 8h1" stroke="#2340b3" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotePage;
