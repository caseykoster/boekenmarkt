import { useState } from 'react';
import { supabase } from './supabase';

export default function SignupRow({ page, itemIndex, maxVolunteers, signups, onRefresh }) {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const active = signups.filter(s => !s.removal_requested);
  const remaining = maxVolunteers - active.length;
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

  const handleRemovalRequest = async (id) => {
    await supabase.from('signups').update({ removal_requested: true }).eq('id', id);
    onRefresh();
  };

  return (
    <div className="signup-row" onClick={e => e.stopPropagation()}>
      {active.length > 0 && (
        <div className="signup-names">
          {active.map(s => (
            <span key={s.id} className="signup-name">
              {s.name}
              <button className="removal-btn" title="Vraag om verwijdering" onClick={() => handleRemovalRequest(s.id)}>×</button>
            </span>
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
