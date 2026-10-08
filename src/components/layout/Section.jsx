import { MonoLabel } from '../common/MonoLabel';
import { RevealOnScroll } from '../common/RevealOnScroll';

// Shared wrapper for every content section: consistent spacing plus the
// pipeline-stage-style "0N / label" heading used throughout the site.
export function Section({ id, kicker, heading, children }) {
  return (
    <section id={id} className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <MonoLabel>{kicker}</MonoLabel>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">{heading}</h2>
        </RevealOnScroll>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
