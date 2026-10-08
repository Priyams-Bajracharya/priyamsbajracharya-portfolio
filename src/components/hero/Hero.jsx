import { hero, site } from '../../data';
import { Button } from '../common/Button';
import { PipelineDiagram } from './PipelineDiagram';

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <PipelineDiagram />

        <div className="mt-10 text-center">
          <p className="font-mono text-xs uppercase tracking-wide text-accent sm:text-sm">{hero.eyebrow}</p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary sm:text-xl">{hero.pitch}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {hero.ctas.map((cta) => (
              <Button key={cta.label} href={cta.href} variant={cta.variant} download={cta.download || undefined}>
                {cta.label}
              </Button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-sm text-text-secondary">
            <a href={site.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
