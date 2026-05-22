import { Card, CardHeader, CardBody, TimelineItem } from '../components';

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

export default function TimelinePage() {
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
    </div>
  );
}
