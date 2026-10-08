const SIZES = {
  source: { w: 108, h: 44 },
  transform: { w: 128, h: 56 },
};

// A labeled box on the pipeline diagram (source or transform stage).
// The warehouse node is handled directly in PipelineDiagram since its
// content (resolved name + title) differs from a simple label.
export function PipelineNode({ x, y, label, variant = 'source' }) {
  const { w, h } = SIZES[variant];

  return (
    <g transform={`translate(${x - w / 2}, ${y - h / 2})`}>
      <rect
        width={w}
        height={h}
        rx={10}
        className={variant === 'transform' ? 'fill-bg-surface-2 stroke-accent' : 'fill-bg-surface stroke-border'}
        strokeWidth={1}
      />
      <text
        x={w / 2}
        y={h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`font-mono text-[10px] uppercase tracking-wide ${variant === 'transform' ? 'fill-accent' : 'fill-text-secondary'}`}
      >
        {label}
      </text>
    </g>
  );
}
