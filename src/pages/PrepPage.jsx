import { useState } from 'react';
import { Card, CardHeader, CardBody, ChecklistItem, TimelineItem } from '../components';

const TIMELINE_ITEMS = [
  { date: 'Week van 26 mei', title: 'Lege dozen bij klassen', desc: 'Dozen neerzetten per klas voor donaties van ouders.', urgent: false },
  { date: 'Week van 26 mei', title: 'Oproep via Parro', desc: 'Ouders vragen boeken te doneren. Doel: vóór 13 juni inleveren.', urgent: false },
  { date: 'Week van 26 mei', title: 'Boekenkast doorzoeken', desc: 'Oude & nauwelijks gelezen boeken apart leggen (jij + punt 1).', urgent: false },
  { date: '9–13 juni', title: 'Donaties uitzoeken', desc: 'Ingezamelde boeken sorteren: verkopen vs. niet (punt 4 — jij).', urgent: true },
  { date: '16–18 juni', title: 'Prijskaartjes & tafels', desc: 'Boeken categoriseren, prijsstickers, tafels plannen.', urgent: false },
  { date: '19 juni', title: 'Boekenmarkt! 🎉', desc: 'Twee sessies. Opbouwen vóór eerste sessie, afbreken na laatste.', urgent: false },
];

const CHECKLIST_ITEMS = [
  { text: 'Dozen regelen voor bij de klassen', meta: 'Dozen voor donaties per klas plaatsen' },
  { text: 'Parro-oproep klaar voor Els', meta: 'Tekst opstellen voor donatie-oproep aan ouders' },
  { text: 'Boekenkasten doorzoeken (punt 1)', meta: 'Oude + weinig gelezen boeken apart leggen' },
  { text: 'Sorteersessie ingepland', meta: 'Datum afspreken voor uitzoeken donaties' },
  { text: 'Donaties uitzoeken vóór 19 juni (punt 4)', meta: 'Wat verkopen, wat niet?' },
  { text: 'Prijslijst afgesproken met organisatie', meta: 'Zie Prijzen-tab voor suggesties' },
  { text: 'Tafels & ruimte geregeld', meta: 'Hoeveel tafels, welke plek op school?' },
  { text: 'Wisselgeld geregeld', meta: 'Genoeg kleingeld voor twee sessies' },
  { text: 'Vrijwilligers bevestigd (zie Team-tab)', meta: 'Wie helpt opbouwen, verkopen, afbreken?' },
  { text: 'Draaiboek gedeeld met alle vrijwilligers', meta: 'QR-code naar deze app doorsturen' },
];

export default function PrepPage({ onAction }) {
  const [tlDone, setTlDone] = useState(Array(TIMELINE_ITEMS.length).fill(false));
  const [checked, setChecked] = useState(Array(CHECKLIST_ITEMS.length).fill(false));

  const toggleTl = (i) => {
    setTlDone(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    onAction();
  };
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
              <TimelineItem key={i} {...item} done={tlDone[i]} onToggle={() => toggleTl(i)} />
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
