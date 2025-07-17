import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch notes
  useEffect(() => {
    axios.get(API_URL).then(res => setNotes(res.data));
  }, []);

  // Toggle dark mode by adding/removing 'dark' class on root div
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Select note
  const handleSelectNote = id => {
    setSelectedNoteId(id);
    const note = notes.find(n => n._id === id);
    setEditingNote(note ? { ...note } : null);
  };

  // Handle change
  const handleChange = updatedNote => {
    setEditingNote(updatedNote);
  };

  // Save note
  const handleSave = () => {
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }
    axios.put(`${API_URL}/${editingNote._id}`, editingNote).then(res => {
      setNotes(notes => notes.map(n => (n._id === editingNote._id ? res.data : n)));
    });
  };

  // Create new note
  const handleNewNote = () => {
    const newNote = { title: 'Untitled', content: ' ' };
    axios.post(API_URL, newNote).then(res => {
      setNotes(notes => [res.data, ...notes]);
      setSelectedNoteId(res.data._id);
      setEditingNote({ ...res.data });
    });
  };

  // Delete note
  const handleDeleteNote = id => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setNotes(notes => notes.filter(n => n._id !== id));
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
        setEditingNote(null);
      }
    });
  };

  return (
    <div className={darkMode ? 'dark-mode fullpage-bg' : 'fullpage-bg'}>
      <div style={{ position: 'fixed', top: 18, right: 32, zIndex: 100 }}>
        <button onClick={() => setDarkMode(dm => !dm)} style={{
          padding: '0.5rem 1.2rem',
          borderRadius: 8,
          background: darkMode ? '#22223b' : '#f4f6fa',
          color: darkMode ? '#f4f6fa' : '#22223b',
          border: '1.5px solid #c7d2fe',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
          transition: 'background 0.2s, color 0.2s',
        }}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className="main-content-bg App-main-row" style={{ display: 'flex', height: '100vh', alignItems: 'flex-start' }}>
        <div className="sidebar-bg notes-sidebar">
          <NotesList
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onNewNote={handleNewNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
        <NoteEditor note={editingNote} onChange={handleChange} onSave={handleSave} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
