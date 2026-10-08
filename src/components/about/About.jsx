import { about, site } from '../../data';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { Section } from '../layout/Section';
import { Timeline } from './Timeline';

export function About() {
  return (
    <Section id="about" kicker={about.kicker} heading={about.heading}>
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <ImagePlaceholder
          file="profile-picture-320.webp"
          width={160}
          height={160}
          alt={`Portrait of ${site.name}`}
          label="TODO: add profile picture"
          fluid={false}
          className="rounded-full border-2 border-accent"
        />
        <div className="space-y-4 text-text-secondary">
          {about.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="font-mono text-sm uppercase tracking-wide text-text-muted">{about.timelineHeading}</h3>
        <Timeline items={about.timeline} />
      </div>
    </Section>
  );
}
