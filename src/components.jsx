// ── Card ──
export function Card({ children }) {
  return <div className="card">{children}</div>;
}
export function CardHeader({ icon, title }) {
  return (
    <div className="card-header">
      <span className="icon">{icon}</span>
      <h2>{title}</h2>
    </div>
  );
}
export function CardBody({ children }) {
  return <div className="card-body">{children}</div>;
}

// ── Tip ──
export function Tip({ icon = '💡', children }) {
  return (
    <div className="tip">
      <span className="tip-icon">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

// ── ChecklistItem ──
export function ChecklistItem({ text, meta, done, onToggle }) {
  return (
    <li className={done ? 'done' : ''} onClick={onToggle}>
      <div className={`check-box ${done ? 'checked' : ''}`}>{done ? '✓' : ''}</div>
      <div>
        <div className="item-text">{text}</div>
        {meta && <div className="item-meta">{meta}</div>}
      </div>
    </li>
  );
}

// ── TimelineItem ──
export function TimelineItem({ date, title, desc, done, urgent, onToggle }) {
  return (
    <div className={`tl-item ${done ? 'done' : ''} ${urgent ? 'urgent' : ''}`}>
      <div className="tl-dot" onClick={onToggle}>{done ? '✓' : urgent ? '!' : '→'}</div>
      <div className="tl-content">
        <div className="tl-date">{date}</div>
        <div className="tl-title">{title}</div>
        <div className="tl-desc">{desc}</div>
      </div>
    </div>
  );
}
