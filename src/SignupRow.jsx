import { useState } from 'react';
import { supabase } from './supabase';

export default function SignupRow({ page, itemIndex, maxVolunteers, signups, onRefresh }) {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const remaining = maxVolunteers - signups.length;
  const isFull = remaining <= 0;

  const handleSignup = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    await supabase.from('signups').insert({ page, item_index: itemIndex, name: trimmed });
    setName('');
    setShowInput(false);
    setLoading(false);
    onRefresh();
  };

  return (
    <div className="signup-row" onClick={e => e.stopPropagation()}>
      {signups.length > 0 && (
        <div className="signup-names">
          {signups.map(s => (
            <span key={s.id} className="signup-name">{s.name}</span>
          ))}
        </div>
      )}
      <div className="signup-footer">
        {isFull ? (
          <span className="signup-full">Vol ✓</span>
        ) : showInput ? (
          <div className="signup-input-row">
            <input
              autoFocus
              placeholder="Jouw naam…"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSignup(); if (e.key === 'Escape') { setShowInput(false); setName(''); } }}
            />
            <button className="signup-confirm" onClick={handleSignup} disabled={loading}>✓</button>
            <button className="signup-cancel" onClick={() => { setShowInput(false); setName(''); }}>✕</button>
          </div>
        ) : (
          <div className="signup-status-row">
            <span className="signup-needed">Nog {remaining} {remaining === 1 ? 'vrijwilliger' : 'vrijwilligers'} nodig</span>
            <button className="signup-btn" onClick={() => setShowInput(true)}>Ik doe mee</button>
          </div>
        )}
      </div>
    </div>
  );
}
