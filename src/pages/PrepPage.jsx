import { useState } from 'react';
import { Card, CardHeader, CardBody, ChecklistItem, TimelineItem } from '../components';

const TIMELINE_ITEMS = [
  { date: 'Week van 26 mei', title: 'Lege dozen bij klassen', desc: 'Dozen neerzetten per klas voor donaties van ouders.', startDate: '2026-05-26', endDate: '2026-05-30' },
  { date: 'Week van 26 mei', title: 'Oproep via Parro', desc: 'Ouders vragen boeken te doneren. Doel: vóór 13 juni inleveren.', startDate: '2026-05-26', endDate: '2026-05-30' },
  { date: 'Week van 26 mei', title: 'Boekenkast doorzoeken', desc: 'Oude & nauwelijks gelezen boeken apart leggen.', startDate: '2026-05-26', endDate: '2026-05-30' },
  { date: '9–13 juni', title: 'Donaties uitzoeken', desc: 'Ingezamelde boeken sorteren: verkopen vs. niet.', startDate: '2026-06-09', endDate: '2026-06-13' },
  { date: '16–18 juni', title: 'Prijskaartjes & tafels', desc: 'Boeken categoriseren, prijsstickers, tafels plannen.', startDate: '2026-06-16', endDate: '2026-06-18' },
  { date: '19 juni', title: 'Boekenmarkt! 🎉', desc: 'Twee sessies. Opbouwen vóór eerste sessie, afbreken na laatste.', startDate: '2026-06-19', endDate: '2026-06-19' },
];

function getTlStatus(startDate, endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (today > end) return 'done';
  if (today >= start) return 'current';
  return 'future';
}

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
        <CardHeader icon="🗓️" title="Tijdlijn naar 19 juni" />
        <CardBody>
          <div className="timeline">
            {TIMELINE_ITEMS.map((item, i) => (
              <TimelineItem key={i} {...item} status={getTlStatus(item.startDate, item.endDate)} />
            ))}
          </div>
        </CardBody>
      </Card>

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
