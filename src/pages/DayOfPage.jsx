import { useState } from 'react';
import { Card, CardHeader, CardBody, TimelineItem, Tip } from '../components';

const SCHEDULE = [
  { date: 'Ochtend (vóór school)', title: 'Opbouwen tafels & boeken uitstallen', desc: 'Tafels klaarzetten, boeken op categorie uitleggen, borden ophangen, wisselgeld klaarzetten.' },
  { date: 'Sessie 1 · bijv. 14:30–15:30', title: 'Eerste verkoopsessie', desc: 'Kinderen + ouders welkom. Zorg dat er altijd iemand bij de kassa staat. Noteer de opbrengst per categorie.' },
  { date: 'Tussenpauze', title: 'Aanvullen & opruimen', desc: 'Gaten opvullen, gevallen boeken rechtzetten, geld tellen.' },
  { date: 'Sessie 2 · bijv. 15:30–16:30', title: 'Tweede verkoopsessie', desc: 'Eventueel prijzen verlagen voor boeken die er nog veel zijn. Zorg voor speelse sfeer.' },
  { date: 'Na sessie 2', title: 'Afbreken & geld tellen', desc: 'Dozen met resterende boeken klaar. Totale opbrengst noteren. Locatie achterlaten zoals gevonden.' },
];

export default function DayOfPage({ onAction }) {
  const [done, setDone] = useState(Array(SCHEDULE.length).fill(false));

  const toggleStep = (i) => {
    setDone(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    onAction();
  };

  return (
    <div className="page">
      <Card>
        <CardHeader icon="⏰" title="Dagschema 19 juni" />
        <CardBody>
          <div className="timeline">
            {SCHEDULE.map((item, i) => (
              <TimelineItem key={i} {...item} done={done[i]} onToggle={() => toggleStep(i)} />
            ))}
          </div>
        </CardBody>
      </Card>

      <Tip icon="🎈">
        Tip: zet een bordje "Alle boeken — kies er 3 voor €2,–" aan het einde van sessie 2 om resterende boeken weg te geven.
      </Tip>
    </div>
  );
}
