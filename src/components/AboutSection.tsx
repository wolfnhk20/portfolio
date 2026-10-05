import SectionWrapper from "./SectionWrapper";
import { Led } from "./hardware";

/* Content sourced from ayushkulal_resume.pdf — keep in sync */
const specs = [
  { k: "now", v: "AI Agent Developer (intern) @ SpurQLabs" },
  { k: "prev", v: "founder, Anchorlit — web apps & AI chatbots, ’24–26" },
  { k: "edu", v: "B.E. Comp Eng @ AISSMS COE, Pune ’24–27 · CGPA 8.2" },
  { k: "diploma", v: "IT @ AISSMS Polytechnic — 88.88%, ’21–24" },
  { k: "focus", v: "MCP · agentic AI · RAG · backend systems" },
  { k: "won", v: "1st / 240+ — State TechCode War 2023" },
  { k: "cited", v: "LOR from Pune Municipal Corporation" },
  { k: "off-hours", v: "guitar · gym · gaming · anime" },
];

const serviceLog = [
  { date: "2026-06", note: "installed at SpurQLabs — production AI agents on MCP architectures" },
  { date: "2025", note: "shipped QAForge, Ragora, Bloom Events" },
  { date: "2024", note: "B.E. begins · Anchorlit founded · LangChain deep-dive" },
  { date: "2023", note: "1st/240+ State TechCode War · PMC letter for EcoWatchAI" },
  { date: "2021", note: "unit powered on — Diploma in IT" },
];

const AboutSection = () => (
  <SectionWrapper id="about" unit="AK-01" title="PREAMP" sub="operator profile · gain stage">
    <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-12 mb-12">
      {/* Operator photo in a display well */}
      <figure className="w-48 md:w-full max-w-[220px] mx-auto md:mx-0">
        <div className="display-well p-1.5">
          <img
            src="/ayush.png"
            alt="Ayush Kulal"
            loading="lazy"
            className="w-full aspect-[3/4] object-cover object-top grayscale-[60%] contrast-[1.05] hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <figcaption className="flex items-center justify-between mt-2.5">
          <span className="silk text-[0.55rem]">operator no. 001</span>
          <span className="flex items-center gap-1.5">
            <Led color="green" />
            <span className="font-mono-data text-[0.55rem] tracking-widest text-muted-foreground uppercase">active</span>
          </span>
        </figcaption>
      </figure>

      <div className="space-y-8 min-w-0">
        <div className="space-y-4 text-sm text-foreground/60 leading-[1.85] max-w-xl">
          <p>I've always cared more about <span className="text-foreground/90">how things work</span> than just making them work. That pulled me into backend systems — data flow, auth, latency, the stuff that breaks at 2 a.m.</p>
          <p>Systems thinking led to AI infrastructure. After my first RAG pipeline I went deep: hybrid search, reranking, multi-tenant isolation, hallucination guardrails. Now I build production AI agents at <span className="text-foreground/90">SpurQLabs</span> — QA, sales, and marketing automation on MCP-based architectures.</p>
          <p>Before that I ran <span className="text-foreground/90">Anchorlit</span> for two years — a small agency shipping web apps and AI chatbots. Requirements to deployment, no handoffs.</p>
          <p>The rest of the rack: guitar (blues to metal, no loyalty), gym most days, gaming, anime at hours I won't defend.</p>
        </div>

        {/* Spec plate */}
        <dl className="max-w-xl font-mono-data text-[0.68rem]">
          {specs.map((s) => (
            <div key={s.k} className="flex items-baseline py-1.5">
              <dt className="text-accent/80 uppercase tracking-widest shrink-0">{s.k}</dt>
              <span className="leader" />
              <dd className="text-foreground/60 text-right leading-relaxed">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

    {/* Service log */}
    <div className="display-well px-5 md:px-7 py-5 max-w-2xl">
      <p className="silk text-[0.6rem] mb-4">service log — most recent first</p>
      <div className="font-mono-data text-[0.68rem] leading-relaxed space-y-2">
        {serviceLog.map((l) => (
          <div key={l.date} className="flex gap-4">
            <span className="text-accent/70 shrink-0 w-16">{l.date}</span>
            <span className="text-foreground/55">{l.note}</span>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
