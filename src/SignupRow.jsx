import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function SignupRow({ page, itemIndex, taskLabel, maxVolunteers, signups, onRefresh }) {
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(null); // signup object to remove

  const remaining = maxVolunteers - signups.length;
  const isFull = remaining <= 0;

  const dismissInput = () => {
    document.activeElement?.blur();
    setShowInput(false);
    setName('');
  };

  const handleSignup = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    document.activeElement?.blur();
    await supabase.from('signups').insert({ page, item_index: itemIndex, name: trimmed });
    setName('');
    setShowInput(false);
    setLoading(false);
    onRefresh();
  };

  useEffect(() => {
    document.body.style.overflow = confirmRemove ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [confirmRemove]);

  const handleRemove = async () => {
    if (!confirmRemove) return;
    await supabase.from('signups').delete().eq('id', confirmRemove.id);
    setConfirmRemove(null);
    onRefresh();
  };

  return (
    <div className="signup-row" onClick={e => e.stopPropagation()}>
      {confirmRemove && (
        <div className="remove-modal-backdrop" onClick={() => setConfirmRemove(null)}>
          <div className="remove-modal" onClick={e => e.stopPropagation()}>
            <p className="remove-modal-name">{confirmRemove.name}</p>
            <p className="remove-modal-task">verwijderen uit <strong>{taskLabel}</strong>?</p>
            <div className="remove-modal-actions">
              <button className="remove-modal-cancel" onClick={() => setConfirmRemove(null)}>Annuleer</button>
              <button className="remove-modal-confirm" onClick={handleRemove}>Verwijderen</button>
            </div>
          </div>
        </div>
      )}
      {signups.length > 0 && (
        <div className="signup-names">
          {signups.map(s => (
            <span key={s.id} className="signup-name">
              {s.name}
              <button className="removal-btn" title="Verwijder aanmelding" onClick={() => setConfirmRemove(s)}>×</button>
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
              onKeyDown={e => { if (e.key === 'Enter') handleSignup(); if (e.key === 'Escape') dismissInput(); }}
            />
            <button className="signup-confirm" onClick={handleSignup} disabled={loading}>✓</button>
            <button className="signup-cancel" onClick={dismissInput}>✕</button>
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
