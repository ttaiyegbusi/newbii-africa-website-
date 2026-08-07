import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { QA } from '@/lib/motion';
import styles from './BannerPhysics.module.css';

interface ShapeDef {
  key: string;
  src: string;
  /** displayed width / height in px (keeps the SVG aspect ratio) */
  w: number;
  h: number;
  /** collision radius as a fraction of half the smaller side */
  rf: number;
  /** resting position for the reduced-motion / QA cluster (% of the zone) */
  sLeft: number;
  sBottom: number;
}

// Displayed sizes derived from each SVG's intrinsic aspect ratio.
const SHAPES: ShapeDef[] = [
  { key: 'cyan', src: '/assets/shapes/banner-cyan.svg', w: 120, h: 120, rf: 0.9, sLeft: 4, sBottom: 2 },
  { key: 'orange', src: '/assets/shapes/banner-orange.svg', w: 122, h: 121, rf: 0.68, sLeft: 22, sBottom: 0 },
  { key: 'pink', src: '/assets/shapes/banner-pink.svg', w: 132, h: 132, rf: 0.7, sLeft: 40, sBottom: 4 },
  { key: 'yellow', src: '/assets/shapes/banner-yellow.svg', w: 122, h: 122, rf: 0.9, sLeft: 60, sBottom: 0 },
  { key: 'pentagon', src: '/assets/shapes/banner-pentagon.svg', w: 122, h: 123, rf: 0.8, sLeft: 30, sBottom: 40 },
  { key: 'purple', src: '/assets/shapes/banner-purple.svg', w: 112, h: 135, rf: 0.56, sLeft: 60, sBottom: 44 },
  { key: 'green', src: '/assets/shapes/banner-green.svg', w: 118, h: 131, rf: 0.58, sLeft: 78, sBottom: 12 },
];

/**
 * The seven brand shapes as a physics sandbox in the right side of the banner:
 * they drop in from above under gravity, collide with each other and the
 * floor/walls, stack up, and can be grabbed, dragged, and thrown. Honours
 * reduced-motion (and QA) by rendering a static settled cluster instead.
 */
export function BannerPhysics() {
  const reduced = useReducedMotion();
  const still = reduced || QA;
  const zoneRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (still) return;
    const zone = zoneRef.current;
    if (!zone) return;

    const { Engine, Runner, Bodies, Composite, Body, Events } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1;

    let width = zone.clientWidth;
    let height = zone.clientHeight;

    // Static walls keep the shapes inside the right-hand play zone.
    const T = 400;
    const wallOpts = { isStatic: true };
    const floor = Bodies.rectangle(width / 2, height + T / 2, 4000, T, wallOpts);
    const leftW = Bodies.rectangle(-T / 2, height / 2, T, 4000, wallOpts);
    const rightW = Bodies.rectangle(width + T / 2, height / 2, T, 4000, wallOpts);
    const ceiling = Bodies.rectangle(width / 2, -height - T, 4000, T, wallOpts);
    Composite.add(engine.world, [floor, leftW, rightW, ceiling]);

    // One circular body per shape, dropped from above with a horizontal spread.
    const bodies = SHAPES.map((s, i) => {
      const r = (Math.min(s.w, s.h) / 2) * s.rf;
      const startX = Math.max(r, Math.min(width - r, width * (0.12 + i * 0.12)));
      const startY = -120 - i * 140;
      return Bodies.circle(startX, startY, r, {
        restitution: 0.45,
        friction: 0.03,
        frictionAir: 0.008,
        angle: (Math.random() - 0.5) * 1.2,
      });
    });

    // Drop them straight away — the component only mounts once in view.
    const dropTimer = window.setTimeout(() => {
      Composite.add(engine.world, bodies);
    }, 120);

    // Sync DOM elements to their body transforms each tick.
    const sync = () => {
      bodies.forEach((b, i) => {
        const el = shapeRefs.current[i];
        if (!el) return;
        const { w, h } = SHAPES[i];
        el.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
      });
    };
    Events.on(engine, 'afterUpdate', sync);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // ---- Pointer drag / throw ----
    const cleanups: (() => void)[] = [];
    bodies.forEach((body, i) => {
      const el = shapeRefs.current[i];
      if (!el) return;

      let dragging = false;
      let offsetX = 0;
      let offsetY = 0;
      let vx = 0;
      let vy = 0;
      let lastX = 0;
      let lastY = 0;

      const toZone = (e: PointerEvent) => {
        const rect = zone.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };

      const onDown = (e: PointerEvent) => {
        dragging = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add(styles.grabbing);
        Body.setStatic(body, true); // move exactly with the pointer, still shoves others
        const p = toZone(e);
        offsetX = body.position.x - p.x;
        offsetY = body.position.y - p.y;
        lastX = p.x;
        lastY = p.y;
        vx = vy = 0;
      };

      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const p = toZone(e);
        vx = p.x - lastX;
        vy = p.y - lastY;
        lastX = p.x;
        lastY = p.y;
        Body.setPosition(body, { x: p.x + offsetX, y: p.y + offsetY });
      };

      const onUp = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        el.releasePointerCapture(e.pointerId);
        el.classList.remove(styles.grabbing);
        Body.setStatic(body, false);
        const clamp = (v: number) => Math.max(-32, Math.min(32, v));
        Body.setVelocity(body, { x: clamp(vx), y: clamp(vy) });
        Body.setAngularVelocity(body, clamp(vx) * 0.01);
      };

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
      cleanups.push(() => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
      });
    });

    // ---- Keep the play zone sized to the banner ----
    const ro = new ResizeObserver(() => {
      width = zone.clientWidth;
      height = zone.clientHeight;
      Body.setPosition(floor, { x: width / 2, y: height + T / 2 });
      Body.setPosition(rightW, { x: width + T / 2, y: height / 2 });
      Body.setPosition(leftW, { x: -T / 2, y: height / 2 });
      Body.setPosition(ceiling, { x: width / 2, y: -height - T });
    });
    ro.observe(zone);

    return () => {
      window.clearTimeout(dropTimer);
      ro.disconnect();
      cleanups.forEach((fn) => fn());
      Events.off(engine, 'afterUpdate', sync);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [still]);

  return (
    <div className={styles.zone} ref={zoneRef} aria-hidden="true">
      {SHAPES.map((s, i) => (
        <div
          key={s.key}
          ref={(el) => {
            shapeRefs.current[i] = el;
          }}
          className={`${styles.shape} ${still ? styles.still : ''}`}
          style={
            still
              ? { width: s.w, height: s.h, left: `${s.sLeft}%`, bottom: `${s.sBottom}%`, top: 'auto' }
              : { width: s.w, height: s.h }
          }
        >
          <img src={s.src} alt="" draggable={false} width={s.w} height={s.h} />
        </div>
      ))}
    </div>
  );
}
