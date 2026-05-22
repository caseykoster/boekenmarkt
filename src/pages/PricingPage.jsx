import { Card, CardHeader, CardBody } from '../components';

const PRICES = [
  { category: 'Prentenboek', price: '€0,50', example: 'Kleine kleuter boekjes' },
  { category: 'Kinderboek', price: '€1,–', example: 'Standaard leeftijdsboek' },
  { category: 'Dik boek', price: '€2,–', example: 'Langer kinderboek' },
  { category: 'Reeks / set', price: '€3,–', example: 'Meerdere delen samen' },
  { category: 'Speciale editie', price: '€2,50', example: 'Groot formaat, atlas, etc.' },
  { category: 'Tijdschrift/comic', price: '€0,50', example: 'Donald Duck, etc.' },
];

export default function PricingPage() {
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
    </div>
  );
}
