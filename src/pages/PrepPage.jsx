import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, ChecklistItem } from '../components';
import SignupRow from '../SignupRow';
import { supabase } from '../supabase';

const CHECKLIST_ITEMS = [
  { text: 'Dozen regelen voor bij de klassen', meta: 'Dozen voor donaties per klas plaatsen', maxVolunteers: 1 },
  { text: 'Parro-oproep klaar voor Els', meta: 'Tekst opstellen voor donatie-oproep aan ouders', maxVolunteers: 1 },
  { text: 'Boekenkasten doorzoeken', meta: 'Oude + weinig gelezen boeken apart leggen', maxVolunteers: 2 },
  { text: 'Sorteersessie ingepland', meta: 'Datum afspreken voor uitzoeken donaties', maxVolunteers: 1 },
  { text: 'Donaties uitzoeken vóór 19 juni', meta: 'Wat verkopen, wat niet?', maxVolunteers: 2 },
  { text: 'Prijslijst afgesproken met organisatie', meta: 'Zie Prijzen-tab voor suggesties', maxVolunteers: 1 },
  { text: 'Gekleurde stickers kopen', meta: 'Eén kleur per prijscategorie', maxVolunteers: 1 },
  { text: 'Stickers op de boeken plakken', meta: 'Elk boek een prijssticker geven vóór de markt', maxVolunteers: 3 },
  { text: 'Prijsbord maken voor op de markt', meta: 'Groot leesbaar bord met prijzen per categorie', maxVolunteers: 1 },
  { text: 'Tafels & ruimte geregeld', meta: 'Hoeveel tafels, welke plek op school?', maxVolunteers: 1 },
  { text: 'Wisselgeld geregeld', meta: 'Genoeg kleingeld voor twee sessies', maxVolunteers: 1 },
  { text: 'Vrijwilligers bevestigd', meta: 'Wie helpt opbouwen, verkopen, afbreken?', maxVolunteers: 1 },
  { text: 'Draaiboek gedeeld met alle vrijwilligers', meta: 'QR-code naar deze app doorsturen', maxVolunteers: 1 },
];

export default function PrepPage({ onAction }) {
  const [checked, setChecked] = useState(Array(CHECKLIST_ITEMS.length).fill(false));
  const [signups, setSignups] = useState([]);

  useEffect(() => { fetchSignups(); }, []);

  const fetchSignups = async () => {
    const { data } = await supabase.from('signups').select('*').eq('page', 'prep');
    setSignups(data || []);
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
              <ChecklistItem
                key={i}
                {...item}
                done={checked[i]}
                onToggle={() => toggleCheck(i)}
                extra={
                  <SignupRow
                    page="prep"
                    itemIndex={i}
                    maxVolunteers={item.maxVolunteers}
                    signups={signups.filter(s => s.item_index === i)}
                    onRefresh={fetchSignups}
                  />
                }
              />
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
