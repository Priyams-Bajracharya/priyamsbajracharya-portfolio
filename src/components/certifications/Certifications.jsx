import { certifications } from '../../data';
import { Section } from '../layout/Section';
import { CertCard } from './CertCard';

export function Certifications() {
  return (
    <Section id="certifications" kicker={certifications.kicker} heading={certifications.heading}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.items.map((cert, index) => (
          <CertCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </Section>
  );
}
