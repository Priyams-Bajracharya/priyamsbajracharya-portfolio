import { contact } from '../../data';
import { Section } from '../layout/Section';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <Section id="contact" kicker={contact.kicker} heading={contact.heading}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <p className="text-text-secondary">{contact.line}</p>
          <div className="mt-6 space-y-2 font-mono text-sm">
            <a href={`mailto:${contact.email}`} className="block text-text-primary transition-colors hover:text-accent">
              {contact.email}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="block text-text-primary transition-colors hover:text-accent">
              LinkedIn
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
