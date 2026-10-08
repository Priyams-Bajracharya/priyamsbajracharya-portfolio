import { RevealOnScroll } from '../common/RevealOnScroll';

export function CertCard({ cert, index }) {
  return (
    <RevealOnScroll delay={index * 0.08}>
      <a
        href={cert.url}
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg border border-border bg-bg-surface p-5 transition-colors hover:border-accent"
      >
        <p className="font-mono text-xs uppercase tracking-wide text-text-muted">{cert.issuer}</p>
        <h3 className="mt-1 text-base font-semibold text-text-primary">{cert.title}</h3>
        <p className="mt-2 text-sm text-text-secondary">{cert.date}</p>
      </a>
    </RevealOnScroll>
  );
}
