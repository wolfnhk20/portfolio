import { Panel, Led, VUMeter, HwLink } from "./hardware";

/* Content sourced from ayushkulal_resume.pdf — keep in sync */
const specs = [
  { k: "operator", v: "Ayush Kulal — backend & applied AI engineer" },
  { k: "now", v: "AI Agent Developer (intern) @ SpurQLabs" },
  { k: "prev", v: "founder, Anchorlit — ’24–26" },
  { k: "edu", v: "B.E. Comp Eng ’27 · CGPA 8.2 · Pune, IN" },
];

const channels = [
  { label: "JAVA", on: true },
  { label: "PYTHON", on: true },
  { label: "MCP", on: true },
  { label: "RAG", on: true },
  { label: "SPRING", on: true },
  { label: "FASTAPI", on: true },
  { label: "SLEEP", on: false },
];

const HeroSection = () => (
  <div className="px-2.5 md:px-4 pt-4 md:pt-6">
    <Panel className="max-w-5xl mx-auto">
      {/* Brand rail */}
      <div className="px-6 md:px-10 pt-6 md:pt-7 pb-4 flex items-center justify-between gap-4">
        <span className="unit-tag">
          <span className="unit-num">AK-00</span>
          <span className="silk text-[0.62rem]">mainframe · head unit</span>
        </span>
        <span className="hidden sm:flex items-center gap-2 font-mono-data text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
          <Led color="green" blink />
          <span>on air — open to work</span>
        </span>
      </div>
      <div className="groove mx-6 md:mx-10" />

      {/* Masthead */}
      <div className="px-6 md:px-10 pt-8 md:pt-12 pb-6 md:pb-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="min-w-0">
            <p className="silk text-[0.65rem] mb-4">est. pune, india — ships worldwide</p>
            <h1 className="font-masthead text-[clamp(3.4rem,10.5vw,7.5rem)] leading-[0.92] text-foreground uppercase">
              Ayush<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px hsl(42 38% 86% / 0.9)" }}>
                Kulal
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-[1.85] text-foreground/60">
              High-headroom engineer for production AI agents, RAG pipelines, and
              the REST APIs underneath. Currently interning at{" "}
              <span className="text-foreground/90">SpurQLabs</span>; two years
              running <span className="text-foreground/90">Anchorlit</span> before that.
              Low noise. No hallucinations at the output stage.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <HwLink href="#projects" external={false}><span className="text-accent">▶</span> play the work</HwLink>
              <HwLink href="#contact" external={false}>patch in</HwLink>
              <a href="/ayushkulal_resume.pdf" target="_blank" rel="noopener noreferrer" className="hw-btn hw-btn-red">
                ● rec — spec sheet
              </a>
            </div>
          </div>

          {/* Meter bridge */}
          <div className="shrink-0 flex lg:flex-col gap-5 items-start">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <VUMeter label="BUILD" duration={4.2} />
                <span className="silk text-[0.55rem]">output</span>
              </div>
              <div className="hidden sm:flex flex-col items-center gap-1.5">
                <VUMeter label="LEARN" duration={3.1} delay={0.6} />
                <span className="silk text-[0.55rem]">input</span>
              </div>
            </div>
            {/* Spec strip */}
            <div className="w-full max-w-[15rem] font-mono-data text-[0.62rem] leading-relaxed">
              {specs.map((s) => (
                <div key={s.k} className="flex items-baseline py-1">
                  <span className="text-accent/80 uppercase tracking-widest shrink-0">{s.k}</span>
                  <span className="leader" />
                  <span className="text-foreground/60 text-right">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channel strip: stack as LED channels */}
      <div className="groove mx-6 md:mx-10" />
      <div className="px-6 md:px-10 py-4 flex items-center gap-5 md:gap-7 overflow-x-auto scrollbar-none">
        {channels.map((c) => (
          <span key={c.label} className="flex items-center gap-2 shrink-0">
            <Led color={c.on ? "amber" : "green"} off={!c.on} />
            <span className={`font-mono-data text-[0.6rem] tracking-[0.18em] ${c.on ? "text-foreground/70" : "text-muted-foreground/50"}`}>
              {c.label}
            </span>
          </span>
        ))}
        <span className="ml-auto hidden md:inline font-mono-data text-[0.6rem] tracking-[0.18em] text-muted-foreground/60 shrink-0">
          ↓ scroll the rack
        </span>
      </div>
    </Panel>
  </div>
);

export default HeroSection;
