import { useCallback, useEffect, useMemo, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import land110m from 'world-atlas/land-110m.json';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Backstory.module.css';

const CX = 260;
const CY = 260;
const R = 112;

/** Pentagon points (radius 11) centred at the origin, for decorative nodes. */
const PENT = '0,-11 10.5,-3.4 6.5,8.9 -6.5,8.9 -10.5,-3.4';

interface Node {
  angle: number; // degrees around the globe
  radius: number; // distance from centre
  shape: 'pentagon' | 'circle';
  color: string;
}

// Decorative nodes scattered on the orbit rings (they rotate as a group).
const NODES: Node[] = [
  { angle: 118, radius: 205, shape: 'pentagon', color: 'var(--newbii-orange)' },
  { angle: 74, radius: 250, shape: 'pentagon', color: 'var(--newbii-yellow)' },
  { angle: 96, radius: 200, shape: 'circle', color: 'var(--newbii-pink)' },
  { angle: 168, radius: 250, shape: 'pentagon', color: 'var(--newbii-orange)' },
  { angle: 205, radius: 200, shape: 'circle', color: 'var(--newbii-purple)' },
  { angle: 235, radius: 205, shape: 'circle', color: 'var(--newbii-pink)' },
  { angle: 262, radius: 250, shape: 'circle', color: 'var(--newbii-pink)' },
  { angle: 292, radius: 250, shape: 'pentagon', color: 'var(--newbii-yellow)' },
  { angle: 30, radius: 205, shape: 'pentagon', color: 'var(--newbii-orange)' },
];

const nodePos = (n: Node) => ({
  x: CX + n.radius * Math.cos((n.angle * Math.PI) / 180),
  y: CY - n.radius * Math.sin((n.angle * Math.PI) / 180),
});

/**
 * Interactive orthographic Earth: real continents (Africa-centred), drag to
 * spin it in any direction, gentle auto-rotation when idle. Three dashed orbit
 * rings carry slowly-orbiting, hoverable nodes, plus two upright role chips.
 */
export function OrbitGlobeGraphic() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  const { projection, path, landGeo } = useMemo(() => {
    const projection = geoOrthographic()
      .scale(R)
      .translate([CX, CY])
      .rotate([-20, -6]); // centre roughly on Africa
    const path = geoPath(projection);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topo = land110m as any;
    const landGeo = feature(topo, topo.objects.land);
    return { projection, path, landGeo };
  }, []);

  const rotation = useRef<[number, number]>([-20, -6]);
  const dragging = useRef(false);
  const nodeAngle = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  const drawGlobe = useCallback(() => {
    projection.rotate(rotation.current);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pathRef.current?.setAttribute('d', path(landGeo as any) ?? '');
  }, [projection, path, landGeo]);

  // The Earth stays Africa-centred and still until dragged; only the nodes
  // orbit on their own. (dt is clamped so a throttled/backgrounded tab can't
  // produce a big jump.)
  useEffect(() => {
    drawGlobe();
    if (reduced) return;

    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - prev, 64);
      prev = now;
      nodeAngle.current = (nodeAngle.current + dt * 0.006) % 360;
      nodesRef.current?.setAttribute('transform', `rotate(${nodeAngle.current} ${CX} ${CY})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [drawGlobe, reduced]);

  // ---- Drag to spin the Earth ----
  const onDown = (e: ReactPointerEvent<SVGCircleElement>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent<SVGCircleElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    rotation.current[0] += dx * 0.35;
    rotation.current[1] = Math.max(-90, Math.min(90, rotation.current[1] - dy * 0.35));
    drawGlobe();
  };
  const onUp = (e: ReactPointerEvent<SVGCircleElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={styles.globeWrap}>
      <svg viewBox="0 0 520 520" className={styles.globeSvg} role="img" aria-label="A spinning globe centred on Africa, orbited by community members across roles.">
        {/* orbit rings */}
        <circle cx={CX} cy={CY} r={250} className={styles.orbitDotted} />
        <circle cx={CX} cy={CY} r={200} className={styles.orbitDotted} />
        <circle cx={CX} cy={CY} r={150} className={styles.orbitDotted} />

        {/* Earth */}
        <circle cx={CX} cy={CY} r={R} fill="var(--newbii-blue)" />
        <path ref={pathRef} fill="var(--newbii-navy)" />

        {/* transparent drag surface over the globe */}
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="transparent"
          className={styles.dragSurface}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />

        {/* orbiting nodes */}
        <g ref={nodesRef} aria-hidden="true">
          {NODES.map((n, i) => {
            const { x, y } = nodePos(n);
            return (
              <g key={i} transform={`translate(${x} ${y})`} className={styles.nodeWrap}>
                {n.shape === 'pentagon' ? (
                  <polygon points={PENT} fill={n.color} className={styles.nodeShape} />
                ) : (
                  <circle r={10} fill={n.color} className={styles.nodeShape} />
                )}
              </g>
            );
          })}
        </g>

        {/* static anchor nodes for the two chips */}
        <polygon points={PENT} transform={`translate(${CX - 150} ${CY - 6})`} fill="var(--newbii-purple)" aria-hidden="true" />
        <circle cx={CX + 150} cy={CY + 12} r={10} fill="var(--newbii-yellow)" aria-hidden="true" />
      </svg>

      {/* upright role chips */}
      <span className={`${styles.chip} ${styles.chipLeft}`}>
        <span aria-hidden="true">🇿🇦</span> UX DESIGNER
      </span>
      <span className={`${styles.chip} ${styles.chipRight}`}>
        <span aria-hidden="true">🇳🇬</span> DATA ANALYST
      </span>
    </div>
  );
}
