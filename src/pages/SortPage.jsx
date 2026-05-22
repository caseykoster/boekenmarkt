import { useState, useRef } from 'react';
import { Card, CardHeader, CardBody, Tip } from '../components';

export default function SortPage({ onAction }) {
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const pending = books.filter(b => !b.decided);
  const sellBooks = books.filter(b => b.decided && b.sell);
  const skipBooks = books.filter(b => b.decided && !b.sell);
  const lastDecided = [...books].reverse().find(b => b.decided);

  const addBook = () => {
    const val = input.trim();
    if (!val) return;
    setBooks(prev => [...prev, { id: Date.now(), title: val, decided: false, sell: null }]);
    setInput('');
    inputRef.current?.focus();
  };

  const decide = (sell) => {
    if (!pending.length) return;
    const id = pending[0].id;
    setBooks(prev => prev.map(b => b.id === id ? { ...b, decided: true, sell } : b));
    onAction();
  };

  const undo = () => {
    if (!lastDecided) return;
    setBooks(prev => prev.map(b => b.id === lastDecided.id ? { ...b, decided: false, sell: null } : b));
  };

  return (
    <div className="page">
      <Card>
        <CardHeader icon="🔢" title="Teller" />
        <CardBody>
          <div className="sort-counter">
            <div className="counter-box green">
              <div className="num">{sellBooks.length}</div>
              <div className="label">Verkopen</div>
            </div>
            <div className="counter-box red">
              <div className="num">{skipBooks.length}</div>
              <div className="label">Niet verkopen</div>
            </div>
            <div className="counter-box amber">
              <div className="num">{books.length}</div>
              <div className="label">Totaal</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader icon="📖" title="Boeken toevoegen & sorteren" />
        <CardBody>
          <div className="book-card-sort">
            {pending.length === 0 && books.length === 0 ? (
              <>
                <div className="book-emoji">📚</div>
                <div className="book-title">Voeg een boek toe</div>
                <div className="book-detail">Typ de titel hieronder en druk op +</div>
              </>
            ) : pending.length === 0 ? (
              <>
                <div className="book-emoji">🎉</div>
                <div className="book-title">Alle boeken gesorteerd!</div>
                <div className="book-detail">Zie de lijst hieronder.</div>
              </>
            ) : (
              <>
                <div className="book-emoji">📖</div>
                <div className="book-title">{pending[0].title}</div>
                <div className="book-detail">Verkopen of niet?</div>
              </>
            )}
          </div>

          <div className="sort-btns">
            <button className="sort-btn sell" onClick={() => decide(true)}>✅ Verkopen</button>
            <button className="sort-btn skip" onClick={() => decide(false)}>❌ Niet verkopen</button>
            <button className="sort-btn undo" onClick={undo}>↩ Undo</button>
          </div>

          <div className="add-book-row">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addBook()}
              placeholder="Boektitel…"
            />
            <button onClick={addBook}>+</button>
          </div>
        </CardBody>
      </Card>

      {sellBooks.length > 0 && (
        <Card>
          <CardHeader icon="✅" title="Te verkopen boeken" />
          <CardBody>
            <ul className="checklist">
              {sellBooks.map(b => (
                <li key={b.id} style={{ cursor: 'default' }}>
                  <div className="check-box checked">✓</div>
                  <div className="item-text">{b.title}</div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Tip>
        <strong>Sorteertip:</strong> Goede staat? Leeftijd duidelijk? Dan verkopen. Beschadigd, erg verouderd of doublure? Dan niet. Bij twijfel: verkopen voor laag bedrag.
      </Tip>
    </div>
  );
}
