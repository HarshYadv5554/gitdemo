import React from 'react';

function NotesList({ notes, selectedNoteId, onSelectNote, onNewNote, onDeleteNote }) {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem', height: '100vh', overflowY: 'auto' }}>
      <h2>Notes</h2>
      <button onClick={onNewNote} style={{ marginBottom: '1rem', width: '100%' }}>+ New Note</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map(note => (
          <li
            key={note._id}
            onClick={() => onSelectNote(note._id)}
            style={{
              padding: '0.5rem',
              cursor: 'pointer',
              background: note._id === selectedNoteId ? '#e0e0e0' : 'transparent',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span onClick={e => { e.stopPropagation(); onSelectNote(note._id); }}>{note.title}</span>
            <button
              onClick={e => { e.stopPropagation(); onDeleteNote(note._id); }}
              style={{ marginLeft: '0.5rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
              title="Delete Note"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList; 