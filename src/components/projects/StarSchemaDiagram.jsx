import { useState } from 'react';

// Reused for every data-warehouse project. Dimensions are arranged evenly
// around the fact table on a circle; hovering OR keyboard-focusing a
// dimension highlights its join line — mouse and keyboard get identical
// behavior since both just set the same `activeId` state.
const SIZE = 600;
const CENTER = { x: SIZE / 2, y: SIZE / 2 };
const RADIUS = SIZE * 0.36;
const DIM_SIZE = { w: 132, h: 52 };
const FACT_SIZE = { w: 156, h: 68 };

export function StarSchemaDiagram({ fact, dimensions }) {
  const [activeId, setActiveId] = useState(null);

  const positioned = dimensions.map((dim, index) => {
    const angle = (index / dimensions.length) * Math.PI * 2 - Math.PI / 2;
    return { ...dim, x: CENTER.x + RADIUS * Math.cos(angle), y: CENTER.y + RADIUS * Math.sin(angle) };
  });

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full"
      aria-label={`Star schema diagram: ${fact.name} joined to ${dimensions.length} dimension tables — ${dimensions
        .map((d) => d.name)
        .join(', ')}. Hover or focus a dimension to highlight its join to the fact table.`}
    >
      {positioned.map((dim) => {
        const isActive = activeId === dim.id;
        return (
          <line
            key={`line-${dim.id}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={dim.x}
            y2={dim.y}
            className={isActive ? 'stroke-accent' : 'stroke-border'}
            strokeWidth={isActive ? 2.5 : 1}
            opacity={isActive ? 1 : 0.6}
          />
        );
      })}

      <g transform={`translate(${CENTER.x - FACT_SIZE.w / 2}, ${CENTER.y - FACT_SIZE.h / 2})`}>
        <rect width={FACT_SIZE.w} height={FACT_SIZE.h} rx={8} className="fill-bg-surface-2 stroke-accent" strokeWidth={1.5} />
        <text
          x={FACT_SIZE.w / 2}
          y={FACT_SIZE.h / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-text-primary font-mono text-[11px]"
        >
          {fact.name}
        </text>
      </g>

      {positioned.map((dim) => {
        const isActive = activeId === dim.id;
        return (
          <g
            key={dim.id}
            role="button"
            tabIndex={0}
            transform={`translate(${dim.x - DIM_SIZE.w / 2}, ${dim.y - DIM_SIZE.h / 2})`}
            onMouseEnter={() => setActiveId(dim.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(dim.id)}
            onBlur={() => setActiveId(null)}
            aria-label={`${dim.name}, joined to ${fact.name}`}
            className="cursor-pointer"
          >
            <rect
              width={DIM_SIZE.w}
              height={DIM_SIZE.h}
              rx={8}
              className={isActive ? 'fill-bg-surface-2 stroke-accent' : 'fill-bg-surface stroke-border'}
              strokeWidth={isActive ? 2 : 1}
            />
            <text
              x={DIM_SIZE.w / 2}
              y={DIM_SIZE.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`font-mono text-[10px] ${isActive ? 'fill-accent' : 'fill-text-secondary'}`}
            >
              {dim.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
