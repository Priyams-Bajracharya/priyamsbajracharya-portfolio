import { RevealOnScroll } from '../common/RevealOnScroll';

export function TimelineItem({ item, index }) {
  return (
    <RevealOnScroll delay={index * 0.08} className="relative pl-10">
      <span className="absolute left-0.75 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg-base" />
      <p className="font-mono text-xs uppercase tracking-wide text-text-muted">{item.dateRange}</p>
      <h4 className="mt-1 text-base font-semibold text-text-primary">{item.title}</h4>
      <p className="text-sm text-text-secondary">{item.org}</p>
      <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
      {item.todo && (
        <p className="mt-2 inline-block rounded border border-dashed border-accent px-2 py-1 font-mono text-xs text-accent">
          TODO: {item.todo}
        </p>
      )}
    </RevealOnScroll>
  );
}
