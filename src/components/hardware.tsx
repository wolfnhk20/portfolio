/**
 * Hardware kit — the physical vocabulary of the whole site.
 * Screws, LEDs, jacks, knobs, VU meters, faceplate panels.
 * Everything decorative is aria-hidden; labels live in real text.
 */
import { CSSProperties, ReactNode } from "react";

/** Machined screw head. Slot angle varies so they don't look cloned. */
export const Screw = ({ className = "", slot = 45 }: { className?: string; slot?: number }) => (
  <span
    aria-hidden
    className={`screw ${className}`}
    style={{ "--slot": `${slot}deg` } as CSSProperties}
  />
);

/** Faceplate with a screw in each corner. */
export const Panel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`panel relative ${className}`}>
    <Screw className="absolute top-2 left-2" slot={38} />
    <Screw className="absolute top-2 right-2" slot={104} />
    <Screw className="absolute bottom-2 left-2" slot={71} />
    <Screw className="absolute bottom-2 right-2" slot={12} />
    {children}
  </div>
);

/** Status LED. */
export const Led = ({ color = "green", blink = false, off = false }: { color?: "green" | "amber" | "red"; blink?: boolean; off?: boolean }) => (
  <span aria-hidden className={`led ${off ? "led-off" : `led-${color}`} ${blink && !off ? "led-blink" : ""}`} />
);

/** 1/4" patch-bay jack with label. */
export const Jack = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-1.5 w-[4.2rem]">
    <span aria-hidden className="jack" />
    <span className="font-mono-data text-[0.52rem] leading-tight tracking-wider text-muted-foreground uppercase text-center">
      {label}
    </span>
  </div>
);

/** Rotary knob, pointer set by --rot. */
export const Knob = ({ label, rot = 0 }: { label: string; rot?: number }) => (
  <div className="flex flex-col items-center gap-2">
    <span aria-hidden className="knob" style={{ "--rot": `${rot}deg` } as CSSProperties} />
    <span className="silk text-[0.55rem]">{label}</span>
  </div>
);

const TICKS = [-48, -36, -24, -12, 0, 12, 24, 36, 48];
const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (angle: number, r: number) => ({
  x: 60 + r * Math.sin(rad(angle)),
  y: 66 - r * Math.cos(rad(angle)),
});

/** Cream-faced VU meter, needle idling. Decorative. */
export const VUMeter = ({ label = "VU", duration = 4.2, delay = 0 }: { label?: string; duration?: number; delay?: number }) => {
  const zoneA = pt(18, 46);
  const zoneB = pt(50, 46);
  return (
    <div aria-hidden className="vu-bezel">
      <svg viewBox="0 0 120 72" className="w-28 h-[4.2rem] block">
        <rect x="0" y="0" width="120" height="72" fill="hsl(42 38% 86%)" />
        <path
          d={`M ${zoneA.x} ${zoneA.y} A 46 46 0 0 1 ${zoneB.x} ${zoneB.y}`}
          fill="none" stroke="hsl(4 72% 44%)" strokeWidth="3"
        />
        {TICKS.map((a) => {
          const p1 = pt(a, 40); const p2 = pt(a, 48);
          return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="hsl(45 20% 15%)" strokeWidth={a === 0 ? 1.6 : 1} />;
        })}
        <text x="60" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="hsl(45 20% 15%)" fontFamily="Archivo, sans-serif">{label}</text>
        <text x="12" y="18" fontSize="6" fill="hsl(45 20% 30%)" fontFamily="IBM Plex Mono, monospace">−20</text>
        <text x="98" y="18" fontSize="6" fill="hsl(4 72% 40%)" fontFamily="IBM Plex Mono, monospace">+3</text>
        <g className="vu-needle" style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
          <line x1="60" y1="66" x2="60" y2="22" stroke="hsl(45 20% 12%)" strokeWidth="1.4" />
        </g>
        <circle cx="60" cy="66" r="4" fill="hsl(45 20% 15%)" />
      </svg>
    </div>
  );
};

/** Mechanical push-button link. */
export const HwLink = ({ href, children, external = true }: { href: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="hw-btn"
  >
    {children}
  </a>
);
