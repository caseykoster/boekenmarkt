import { useState } from 'react';
import { Card, CardHeader, CardBody, Tip } from '../components';

const ROLES = [
  { icon: '🎯', title: 'Hoofdorganisatoren', desc: 'Leiden de markt, nemen beslissingen, zijn eindverantwoordelijk.', slots: 2, defaults: ['Jij', 'Casey Koster'] },
  { icon: '📦', title: 'Opbouwen (ochtend)', desc: 'Tafels slepen, boeken uitstallen, borden ophangen. ~45 min voor opening.', slots: 1, defaults: [''] },
  { icon: '💳', title: 'Kassa sessie 1', desc: 'Geld ontvangen, wisselgeld geven, vriendelijk te woord staan.', slots: 1, defaults: [''] },
  { icon: '💳', title: 'Kassa sessie 2', desc: 'Zelfde als sessie 1. Mag overlap zijn met sessie 1.', slots: 1, defaults: [''] },
  { icon: '🔍', title: 'Sorteren (vooraf)', desc: 'Boekenkast doorzoeken + donaties uitzoeken vóór 19 juni.', slots: 1, defaults: ['Jij'] },
  { icon: '📬', title: 'Afbreken & opruimen', desc: 'Dozen inpakken, locatie schoonmaken, opbrengst afdragen.', slots: 1, defaults: [''] },
];

function RoleCard({ icon, title, desc, slots, defaults, onAction }) {
  const [names, setNames] = useState(defaults);

  const update = (i, val) => {
    setNames(prev => { const n = [...prev]; n[i] = val; return n; });
    onAction();
  };

  return (
    <div className="role-card">
      <h3>{icon} {title}</h3>
      <p>{desc}</p>
      {names.map((name, i) => (
        <div key={i} className="volunteer-name">
          <input
            placeholder={`Naam ${slots > 1 ? i + 1 : ''}…`}
            value={name}
            onChange={e => update(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default function TeamPage({ onAction }) {
  return (
    <div className="page">
      <Card>
        <CardHeader icon="👥" title="Rolverdeling" />
        <CardBody>
          {ROLES.map((role, i) => (
            <RoleCard key={i} {...role} onAction={onAction} />
          ))}
        </CardBody>
      </Card>

      <Tip icon="📱">
        Deel deze pagina via QR-code met alle vrijwilligers zodat iedereen het schema en de rolverdeling bij de hand heeft op de dag zelf.
      </Tip>
    </div>
  );
}
