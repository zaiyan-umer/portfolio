'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { animate, motion, useMotionValue, type MotionValue } from 'motion/react';

const hoverQuery = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)';
function subscribe(callback: () => void) {
  const query = window.matchMedia(hoverQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getSnapshot = () => window.matchMedia(hoverQuery).matches;
const getServerSnapshot = () => false;

type SteamValues = { x: MotionValue<number>; y: MotionValue<number>; opacity: MotionValue<number> };
type SceneValues = {
  foliage: MotionValue<number>;
  glow: MotionValue<number>;
  restingSteam: MotionValue<number>;
  left: SteamValues;
  right: SteamValues;
};
const SceneContext = createContext<SceneValues | null>(null);

function useSteamValues() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  return useMemo(() => ({ x, y, opacity }), [x, y, opacity]);
}

export default function WorkspaceHoverScene({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hovered, setHovered] = useState(false);
  const active = enabled && hovered;
  const amount = useMotionValue(0);
  const foliage = useMotionValue(0);
  const glow = useMotionValue(0);
  const restingSteam = useMotionValue(0.35);
  const left = useSteamValues();
  const right = useSteamValues();
  const values = useMemo(
    () => ({ foliage, glow, restingSteam, left, right }),
    [foliage, glow, restingSteam, left, right],
  );
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    const reset = () => {
      values.foliage.set(0);
      values.glow.set(0);
      values.restingSteam.set(0.35);
      for (const steam of [values.left, values.right]) {
        steam.x.set(0);
        steam.y.set(0);
        steam.opacity.set(0);
      }
      startedAt.current = null;
    };
    if (!enabled) {
      amount.set(0);
      reset();
      return;
    }
    if (!active && amount.get() === 0) return;

    // One envelope and clock keep every effect coordinated without React frame updates.
    const envelope = animate(amount, active ? 1 : 0, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
    let frame = 0;
    const tick = (now: number) => {
      const strength = amount.get();
      if (!active && strength <= 0.0001) {
        reset();
        return;
      }
      startedAt.current ??= now;
      const seconds = (now - startedAt.current) / 1000;
      values.foliage.set(Math.sin((seconds * Math.PI * 2) / 3.6) * 3 * strength);
      values.glow.set((0.65 + 0.35 * (0.5 + 0.5 * Math.sin((seconds * Math.PI * 2) / 4))) * strength);
      values.restingSteam.set(0.35 * (1 - strength));
      for (const [index, steam] of [values.left, values.right].entries()) {
        const phase = (seconds / 2.8 + index * 0.5) % 1;
        steam.y.set(-10 * phase * strength);
        steam.x.set(Math.sin(phase * Math.PI * 2) * 1.2 * strength);
        // Opacity reaches zero at the wrap, so each wisp can restart invisibly.
        steam.opacity.set(Math.sin(phase * Math.PI) ** 2 * 0.5 * strength);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      envelope.stop();
    };
  }, [active, enabled, amount, values]);

  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.hidden) setHovered(false);
    };
    document.addEventListener('visibilitychange', stopWhenHidden);
    return () => document.removeEventListener('visibilitychange', stopWhenHidden);
  }, []);

  return (
    <SceneContext.Provider value={values}>
      <div
        className="portfolio-workspace-frame"
        onPointerEnter={(event) => {
          if (enabled && event.pointerType !== 'touch') setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerCancel={() => setHovered(false)}
      >
        <div className="portfolio-workspace-entrance">{children}</div>
      </div>
    </SceneContext.Provider>
  );
}

export function WorkspaceFoliage({ children }: { children: ReactNode }) {
  const values = useContext(SceneContext);
  return (
    <motion.g
      className="portfolio-workspace-leaves"
      style={{ rotate: values?.foliage ?? 0, originX: '122px', originY: '324px', transformBox: 'view-box' }}
    >
      {children}
    </motion.g>
  );
}

export function WorkspaceGlow({ children }: { children: ReactNode }) {
  const values = useContext(SceneContext);
  return (
    <motion.g className="portfolio-workspace-glow" style={{ opacity: values?.glow ?? 0 }}>
      {children}
    </motion.g>
  );
}

export function WorkspaceRestingSteam({ children }: { children: ReactNode }) {
  const values = useContext(SceneContext);
  return <motion.g style={{ opacity: values?.restingSteam ?? 0.35 }}>{children}</motion.g>;
}

export function WorkspaceSteam({ children, index }: { children: ReactNode; index: 0 | 1 }) {
  const values = useContext(SceneContext);
  const steam = index === 0 ? values?.left : values?.right;
  return (
    <motion.g
      className="portfolio-workspace-steam-wisp"
      style={{ x: steam?.x ?? 0, y: steam?.y ?? 0, opacity: steam?.opacity ?? 0 }}
    >
      {children}
    </motion.g>
  );
}
