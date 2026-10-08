import { Badge } from '../common/Badge';
import { RevealOnScroll } from '../common/RevealOnScroll';

export function SkillGroup({ group, index }) {
  return (
    <RevealOnScroll delay={index * 0.06} className="rounded-lg border border-border bg-bg-surface p-5">
      <h3 className="font-mono text-xs uppercase tracking-wide text-accent">{group.label}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </RevealOnScroll>
  );
}
