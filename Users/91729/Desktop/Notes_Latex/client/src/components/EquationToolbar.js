import React from 'react';

const symbols = [
  // Math symbols
  { label: '∑', latex: '\sum' },
  { label: '∫', latex: '\int' },
  { label: '√', latex: '\sqrt{}' },
  { label: 'π', latex: '\pi' },
  { label: '∞', latex: '\infty' },
  { label: 'lim', latex: '\lim_{x \to a}' },
  { label: 'Matrix', latex: '\begin{bmatrix}a & b \\ c & d\end{bmatrix}' },
  // Chemical symbols
  { label: 'H₂O', latex: 'H_2O' },
  { label: 'CO₂', latex: 'CO_2' },
  { label: '→', latex: '\rightarrow' },
  { label: '⇌', latex: '\rightleftharpoons' },
];

function EquationToolbar({ onInsert }) {
  return (
    <div className="equation-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {symbols.map((sym, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onInsert(sym.latex)}
          style={{ padding: '0.3rem 0.7rem', fontSize: '1.1rem', cursor: 'pointer' }}
        >
          {sym.label}
        </button>
      ))}
    </div>
  );
}

export default EquationToolbar; 