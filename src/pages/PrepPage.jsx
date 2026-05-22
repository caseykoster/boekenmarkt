import { useState } from 'react';
import { Card, CardHeader, CardBody, ChecklistItem } from '../components';

const CHECKLIST_ITEMS = [
  { text: 'Dozen regelen voor bij de klassen', meta: 'Dozen voor donaties per klas plaatsen' },
  { text: 'Parro-oproep klaar voor Els', meta: 'Tekst opstellen voor donatie-oproep aan ouders' },
  { text: 'Boekenkasten doorzoeken', meta: 'Oude + weinig gelezen boeken apart leggen' },
  { text: 'Sorteersessie ingepland', meta: 'Datum afspreken voor uitzoeken donaties' },
  { text: 'Donaties uitzoeken vóór 19 juni', meta: 'Wat verkopen, wat niet?' },
  { text: 'Prijslijst afgesproken met organisatie', meta: 'Zie Prijzen-tab voor suggesties' },
  { text: 'Gekleurde stickers kopen', meta: 'Eén kleur per prijscategorie' },
  { text: 'Stickers op de boeken plakken', meta: 'Elk boek een prijssticker geven vóór de markt' },
  { text: 'Prijsbord maken voor op de markt', meta: 'Groot leesbaar bord met prijzen per categorie' },
  { text: 'Tafels & ruimte geregeld', meta: 'Hoeveel tafels, welke plek op school?' },
  { text: 'Wisselgeld geregeld', meta: 'Genoeg kleingeld voor twee sessies' },
  { text: 'Vrijwilligers bevestigd (zie Team-tab)', meta: 'Wie helpt opbouwen, verkopen, afbreken?' },
  { text: 'Draaiboek gedeeld met alle vrijwilligers', meta: 'QR-code naar deze app doorsturen' },
];

export default function PrepPage({ onAction }) {
  const [checked, setChecked] = useState(Array(CHECKLIST_ITEMS.length).fill(false));

  const toggleCheck = (i) => {
    setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    onAction();
  };

  const doneCount = checked.filter(Boolean).length;
  const pct = Math.round(doneCount / checked.length * 100);

  return (
    <div className="page">
      <Card>
        <CardHeader icon="✅" title="Voorbereiding checklist" />
        <CardBody>
          <div className="progress-wrap">
            <div className="progress-label">
              <span>Voortgang</span>
              <span>{doneCount} / {checked.length}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <ul className="checklist">
            {CHECKLIST_ITEMS.map((item, i) => (
              <ChecklistItem key={i} {...item} done={checked[i]} onToggle={() => toggleCheck(i)} />
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
