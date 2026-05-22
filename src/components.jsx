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
export function ChecklistItem({ text, meta, done, onToggle, extra }) {
  return (
    <li className={done ? 'done' : ''}>
      <div className="checklist-main" onClick={onToggle}>
        <div className={`check-box ${done ? 'checked' : ''}`}>{done ? '✓' : ''}</div>
        <div>
          <div className="item-text">{text}</div>
          {meta && <div className="item-meta">{meta}</div>}
        </div>
      </div>
      {extra}
    </li>
  );
}

// ── TimelineItem ──
export function TimelineItem({ date, title, desc, done, status, onToggle, extra }) {
  const s = status ?? (done ? 'done' : 'future');
  return (
    <>
      <div className={`tl-item ${s}`}>
        <div
          className="tl-dot"
          onClick={onToggle}
          style={{ cursor: onToggle ? 'pointer' : 'default' }}
        >
          {s === 'done' ? '✓' : '→'}
        </div>
        <div className="tl-content">
          <div className="tl-date">{date}</div>
          <div className="tl-title">{title}</div>
          <div className="tl-desc">{desc}</div>
        </div>
      </div>
      {extra && <div className="tl-extra">{extra}</div>}
    </>
  );
}
