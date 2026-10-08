import { TimelineItem } from './TimelineItem';

export function Timeline({ items }) {
  return (
    <ol className="relative mt-6 space-y-8 border-l border-border">
      {items.map((item, index) => (
        <li key={item.id}>
          <TimelineItem item={item} index={index} />
        </li>
      ))}
    </ol>
  );
}
