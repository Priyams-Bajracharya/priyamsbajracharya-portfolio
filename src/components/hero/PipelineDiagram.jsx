import { createRef, useMemo } from 'react';
import { hero, site } from '../../data';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { PipelineNode } from './PipelineNode';
import { PipelinePacket } from './PipelinePacket';

// Two coordinate sets — desktop flows left-to-right, mobile flows top-to-bottom.
// This is a true re-layout (different geometry), not the same diagram scaled down.
const DESKTOP_LAYOUT = {
  viewBox: '0 0 960 400',
  orientation: 'horizontal',
  sources: [
    { x: 80, y: 60 },
    { x: 80, y: 153 },
    { x: 80, y: 246 },
    { x: 80, y: 340 },
  ],
  transform: { x: 480, y: 200 },
  warehouse: { x: 860, y: 200 },
};

const MOBILE_LAYOUT = {
  viewBox: '0 0 360 880',
  orientation: 'vertical',
  sources: [
    { x: 60, y: 50 },
    { x: 150, y: 50 },
    { x: 240, y: 50 },
    { x: 330, y: 50 },
  ],
  transform: { x: 180, y: 420 },
  warehouse: { x: 180, y: 760 },
};

function curvePath(start, end, orientation) {
  if (orientation === 'horizontal') {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
  }
  const midY = (start.y + end.y) / 2;
  return `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
}

export function PipelineDiagram() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reducedMotion = usePrefersReducedMotion();
  const layout = isDesktop ? DESKTOP_LAYOUT : MOBILE_LAYOUT;
  const layoutKey = isDesktop ? 'desktop' : 'mobile';

  const sourcePathRefs = useMemo(() => hero.sources.map(() => createRef()), [layoutKey]);
  const warehousePathRef = useMemo(() => createRef(), [layoutKey]);

  const warehouseSize = { w: 200, h: 84 };

  return (
    <svg
      key={layoutKey}
      viewBox={layout.viewBox}
      className="w-full"
      role="img"
      aria-label={`Diagram: data from ${hero.sources.map((s) => s.label).join(', ')} flows through a ${hero.transformLabel} stage into a ${hero.warehouseLabel} that resolves into ${site.name}, ${site.role}`}
    >
      {/* Source -> Transform curves */}
      {hero.sources.map((source, index) => {
        const path = curvePath(layout.sources[index], layout.transform, layout.orientation);
        return (
          <path
            key={source.id}
            ref={sourcePathRefs[index]}
            d={path}
            fill="none"
            className="stroke-border"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Transform -> Warehouse curve */}
      <path
        ref={warehousePathRef}
        d={curvePath(layout.transform, layout.warehouse, layout.orientation)}
        fill="none"
        className="stroke-border"
        strokeWidth={1.5}
      />

      {/* Traveling packets, sampled against the curves above */}
      {hero.sources.map((source, index) => (
        <PipelinePacket
          key={source.id}
          pathRef={sourcePathRefs[index]}
          duration={2.6}
          delay={index * 0.4}
          staticProgress={0.3 + index * 0.1}
          reducedMotion={reducedMotion}
        />
      ))}
      <PipelinePacket pathRef={warehousePathRef} duration={1.6} delay={0.3} staticProgress={0.6} reducedMotion={reducedMotion} />

      {/* Source nodes */}
      {hero.sources.map((source, index) => (
        <PipelineNode key={source.id} x={layout.sources[index].x} y={layout.sources[index].y} label={source.label} variant="source" />
      ))}

      {/* Transform node */}
      <PipelineNode x={layout.transform.x} y={layout.transform.y} label={hero.transformLabel} variant="transform" />

      {/* Warehouse node — resolves into name + title */}
      <g transform={`translate(${layout.warehouse.x - warehouseSize.w / 2}, ${layout.warehouse.y - warehouseSize.h / 2})`}>
        <rect
          width={warehouseSize.w}
          height={warehouseSize.h}
          rx={12}
          className="fill-bg-surface stroke-accent"
          strokeWidth={1.5}
        />
        <text
          x={warehouseSize.w / 2}
          y={warehouseSize.h / 2 - 20}
          textAnchor="middle"
          className="fill-text-muted font-mono text-[9px] uppercase tracking-wide"
        >
          {hero.warehouseLabel}
        </text>
        <text
          x={warehouseSize.w / 2}
          y={warehouseSize.h / 2 + 4}
          textAnchor="middle"
          className="fill-text-primary font-sans text-[15px] font-semibold"
        >
          {site.name}
        </text>
        <text
          x={warehouseSize.w / 2}
          y={warehouseSize.h / 2 + 24}
          textAnchor="middle"
          className="fill-accent font-mono text-[11px] uppercase tracking-wide"
        >
          {site.role}
        </text>
      </g>
    </svg>
  );
}
