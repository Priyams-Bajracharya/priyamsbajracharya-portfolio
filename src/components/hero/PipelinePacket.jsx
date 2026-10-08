import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

// A small dot that travels along `pathRef`'s path, sampled via the path's own
// getPointAtLength() — the same <path> used for the visible stroke is the
// single source of truth for packet position, so geometry never has to be
// duplicated between the visual curve and the animation.
//
// When reducedMotion is true, no loop starts at all: the packet is placed
// once at a fixed point along the path for a frozen "mid-flight" static view.
export function PipelinePacket({ pathRef, duration = 3, delay = 0, staticProgress = 0.45, reducedMotion = false }) {
  const circleRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;

    const totalLength = path.getTotalLength();
    const placeAt = (progress) => {
      const { x, y } = path.getPointAtLength(progress * totalLength);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
    };

    if (reducedMotion) {
      placeAt(staticProgress);
      return;
    }

    placeAt(0);
    const controls = animate(0, 1, {
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
      onUpdate: placeAt,
    });

    return () => controls.stop();
  }, [pathRef, duration, delay, staticProgress, reducedMotion]);

  return <circle ref={circleRef} r={4} className="fill-accent" style={{ filter: 'drop-shadow(0 0 3px var(--color-accent))' }} />;
}
