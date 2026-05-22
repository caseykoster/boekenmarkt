import { useState } from 'react';
import { Card, CardHeader, CardBody, ChecklistItem } from '../components';

const PRICES = [
  { category: 'Prentenboek', price: '€0,50', example: 'Kleine kleuter boekjes' },
  { category: 'Kinderboek', price: '€1,–', example: 'Standaard leeftijdsboek' },
  { category: 'Dik boek', price: '€2,–', example: 'Langer kinderboek' },
  { category: 'Reeks / set', price: '€3,–', example: 'Meerdere delen samen' },
  { category: 'Speciale editie', price: '€2,50', example: 'Groot formaat, atlas, etc.' },
  { category: 'Tijdschrift/comic', price: '€0,50', example: 'Donald Duck, etc.' },
];

const STICKER_ITEMS = [
  { text: 'Gekleurde stickers per categorie', meta: 'Bijv. geel = €0,50 · groen = €1,– · oranje = €2,–' },
  { text: 'Prijsbord per tafel of categorie', meta: 'Groot leesbaar bord "Alle boeken €1,–" o.i.d.' },
  { text: 'Stickers kopen / uitprinten', meta: 'Kleurcodering spaart tijd op de dag zelf' },
];

export default function PricingPage({ onAction }) {
  const [checked, setChecked] = useState(Array(STICKER_ITEMS.length).fill(false));

  const toggle = (i) => {
    setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    onAction();
  };

  return (
    <div className="page">
      <Card>
        <CardHeader icon="💰" title="Prijssuggesties" />
        <CardBody>
          <div className="price-grid">
            {PRICES.map((p, i) => (
              <div key={i} className="price-item">
                <div className="category">{p.category}</div>
                <div className="price">{p.price}</div>
                <div className="example">{p.example}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader icon="🏷️" title="Prijsstickers praktisch" />
        <CardBody>
          <ul className="checklist">
            {STICKER_ITEMS.map((item, i) => (
              <ChecklistItem key={i} {...item} done={checked[i]} onToggle={() => toggle(i)} />
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
