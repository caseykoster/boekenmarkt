import { Card, CardHeader, CardBody, TimelineItem, Tip } from '../components';

const EVENT_DATE = '2026-06-19';

const SCHEDULE = [
  { date: 'Ochtend (vóór school)', title: 'Opbouwen tafels & boeken uitstallen', desc: 'Tafels klaarzetten, boeken op categorie uitleggen, borden ophangen, wisselgeld klaarzetten.', startHour: 7, endHour: 14 },
  { date: 'Sessie 1 · bijv. 14:30–15:30', title: 'Eerste verkoopsessie', desc: 'Kinderen + ouders welkom. Zorg dat er altijd iemand bij de kassa staat. Noteer de opbrengst per categorie.', startHour: 14.5, endHour: 15.5 },
  { date: 'Tussenpauze', title: 'Aanvullen & opruimen', desc: 'Gaten opvullen, gevallen boeken rechtzetten, geld tellen.', startHour: 15.5, endHour: 15.75 },
  { date: 'Sessie 2 · bijv. 15:45–16:30', title: 'Tweede verkoopsessie', desc: 'Eventueel prijzen verlagen voor boeken die er nog veel zijn. Zorg voor speelse sfeer.', startHour: 15.75, endHour: 16.5 },
  { date: 'Na sessie 2', title: 'Afbreken & geld tellen', desc: 'Dozen met resterende boeken klaar. Totale opbrengst noteren. Locatie achterlaten zoals gevonden.', startHour: 16.5, endHour: 24 },
];

function getScheduleStatus(startHour, endHour) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  if (today < EVENT_DATE) return 'future';
  if (today > EVENT_DATE) return 'done';
  const currentHour = now.getHours() + now.getMinutes() / 60;
  if (currentHour >= endHour) return 'done';
  if (currentHour >= startHour) return 'current';
  return 'future';
}

export default function DayOfPage() {
  return (
    <div className="page">
      <Card>
        <CardHeader icon="⏰" title="Dagschema 19 juni" />
        <CardBody>
          <div className="timeline">
            {SCHEDULE.map((item, i) => (
              <TimelineItem key={i} {...item} status={getScheduleStatus(item.startHour, item.endHour)} />
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
