import SectionWrapper from "./SectionWrapper";
import { Led, Knob } from "./hardware";

/* Content sourced from ayushkulal_resume.pdf — keep in sync */
const stages = [
  {
    stage: "STAGE 2", gain: "+12 dB", current: true,
    period: "jun 2026 — present",
    title: "AI Agent Developer", org: "SpurQLabs", kind: "internship",
    notes: [
      "designed and shipped 3 production-ready AI agents for enterprise automation — streamlining software testing workflows",
      "AI automation across QA, sales, and marketing on MCP-based architectures",
      "scalable backend services tuned for performance, reliability, maintainability",
      "in the room for architecture, technical design, and debugging across multiple AI initiatives",
    ],
    knobs: [
      { label: "agents", rot: 96 },
      { label: "mcp", rot: 120 },
      { label: "backend", rot: 60 },
    ],
  },
  {
    stage: "STAGE 1", gain: "+6 dB", current: false,
    period: "jul 2024 — jun 2026",
    title: "Product Lead & Engineer", org: "Anchorlit", kind: "founder / self-employed",
    notes: [
      "founded and ran a small agency building AI-powered, full-stack web applications",
      "owned product development, API architecture, deployment, automation workflows",
      "complete lifecycle — requirements → architecture → deployment → maintenance",
    ],
    knobs: [
      { label: "product", rot: 84 },
      { label: "apis", rot: 108 },
      { label: "clients", rot: 45 },
    ],
  },
];

const ExperienceSection = () => (
  <SectionWrapper id="experience" unit="AK-04" title="SIGNAL PATH" sub="2 gain stages · unity in, hot out">
    <div className="space-y-10">
      {stages.map((s) => (
        <article key={s.stage} className="grid md:grid-cols-[8.5rem_1fr] gap-5 md:gap-8">
          {/* Stage rail */}
          <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 md:text-right md:pt-1">
            <span className="font-masthead text-xl text-accent/90 leading-none">{s.stage}</span>
            <span className="font-mono-data text-[0.6rem] tracking-widest text-muted-foreground uppercase">{s.gain}</span>
            <span className="flex items-center gap-1.5">
              <Led color={s.current ? "green" : "amber"} blink={s.current} />
              <span className="font-mono-data text-[0.55rem] tracking-widest text-muted-foreground uppercase">
                {s.current ? "engaged" : "printed"}
              </span>
            </span>
          </div>

          <div className="border-l-2 border-black pl-5 md:pl-8 relative">
            <span aria-hidden className="absolute left-[-2px] top-0 h-8 w-[2px] bg-accent/70" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
              <h3 className="font-masthead text-2xl md:text-[1.7rem] tracking-wide text-foreground">{s.title}</h3>
              <span className="font-mono-data text-xs text-foreground/55">@ {s.org}</span>
            </div>
            <p className="font-mono-data text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-5">
              {s.period} · {s.kind}
            </p>
            <ul className="space-y-2 mb-6 text-xs text-foreground/50 leading-relaxed max-w-xl">
              {s.notes.map((n) => (
                <li key={n} className="flex gap-2.5">
                  <span className="text-accent/60 shrink-0">▸</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              {s.knobs.map((k) => <Knob key={k.label} label={k.label} rot={k.rot} />)}
            </div>
          </div>
        </article>
      ))}
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
