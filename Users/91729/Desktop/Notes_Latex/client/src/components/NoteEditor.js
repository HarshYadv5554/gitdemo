import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import EquationToolbar from './EquationToolbar';

function NoteEditor({ note, onChange, onSave, darkMode }) {
  const textareaRef = React.useRef();

  if (!note) return <div style={{ flex: 1, padding: '2rem' }}>Select a note to edit</div>;

  // Insert LaTeX at cursor
  const handleInsertLatex = (latex) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = note.content.slice(0, start);
    const after = note.content.slice(end);
    const newContent = before + latex + after;
    onChange({ ...note, content: newContent });
    // Move cursor after inserted latex
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + latex.length;
    }, 0);
  };

  return (
    <div className="ide-bg" style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', background: '#f4f6fa', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', margin: '2rem', maxWidth: 1200 }}>
      <div className="window-bar">
        <div className="window-dot red" />
        <div className="window-dot yellow" />
        <div className="window-dot green" />
        <span className="window-title">Note Editor</span>
      </div>
      <EquationToolbar onInsert={handleInsertLatex} />
      <div style={{ marginBottom: '1.2rem' }} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', flex: 1, minHeight: 500 }}>
        <div className="ide-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 400, maxHeight: 600, padding: '0', borderRadius: 10, border: darkMode ? '2px solid #61dafb' : '2px solid #2563eb', background: darkMode ? '#23272e' : '#f8fafc', boxShadow: darkMode ? '0 2px 12px rgba(97,218,251,0.10)' : '0 2px 12px rgba(99,102,241,0.10)', gap: '0.7rem' }}>
          <textarea
            ref={textareaRef}
            value={note.content}
            onChange={e => onChange({ ...note, content: e.target.value })}
            placeholder="Write your note here (LaTeX supported)"
            style={{ fontSize: '1.05rem', padding: '0.7rem 1rem', resize: 'vertical', flex: 1, borderRadius: 10, border: 'none', outline: 'none', boxShadow: 'none', background: 'transparent', color: darkMode ? '#e5e9f0' : '#23272e', fontFamily: 'JetBrains Mono, Fira Mono, Consolas, Menlo, monospace' }}
          />
          <div style={{ paddingLeft: '1rem' }}>
            <button onClick={onSave} style={{ alignSelf: 'flex-start', padding: '0.7rem 1.6rem', borderRadius: 8, background: 'linear-gradient(90deg, #6366f1 60%, #2563eb 100%)', color: 'white', border: 'none', fontWeight: 600, fontSize: '1.05rem', boxShadow: '0 2px 8px #6366f122', cursor: 'pointer', letterSpacing: '0.5px' }}>Save</button>
          </div>
        </div>
        <div className="ide-panel" style={{ flex: 1.1, minHeight: 400, maxHeight: 600, overflowY: 'auto', padding: '0.7rem 1rem', borderRadius: 10, border: darkMode ? '2px solid #61dafb' : '2px solid #2563eb', background: darkMode ? '#23272e' : '#f8fafc', boxShadow: darkMode ? '0 2px 12px rgba(97,218,251,0.10)' : '0 2px 12px rgba(99,102,241,0.10)', marginBottom: 0, color: darkMode ? '#e5e9f0' : '#23272e' }}>
          <h3 className="preview-header" style={{ marginTop: 0, marginBottom: '1rem' }}>Live Preview</h3>
          {note.content.split('\n').map((line, idx) => {
            const colonIdx = line.indexOf(':');
            if (colonIdx !== -1) {
              const label = line.slice(0, colonIdx + 1);
              const latex = line.slice(colonIdx + 1).trim();
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ marginRight: 12, color: darkMode ? '#e5e9f0' : '#22223b', fontWeight: 500 }}>{label}</span>
                  <BlockMath math={latex} errorColor={'#cc0000'} />
                </div>
              );
            }
            return <div key={idx} style={{ marginBottom: 8, color: darkMode ? '#e5e9f0' : '#22223b' }}>{line}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default NoteEditor; 