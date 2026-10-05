import SectionWrapper from "./SectionWrapper";
import { Led, HwLink } from "./hardware";

/* Content sourced from ayushkulal_resume.pdf — keep in sync */
const featured = [
  {
    model: "FX-001", title: "QAFORGE", type: "autonomous QA processor",
    live: true,
    description: "Connects to your repo, listens for pushes via webhooks, runs a full AI audit. Zero manual steps.",
    bullets: [
      "multi-agent audit pipeline via LangGraph — live execution logs, AI-written reports",
      "GitHub OAuth + webhook-triggered audits on every push",
      "real-time dashboard streaming each pipeline stage",
    ],
    tech: "python · fastapi · next.js · langgraph · groq · supabase · webhooks",
    github: "https://github.com/wolfnhk20/qa-forge/", demo: "https://qa-forge.vercel.app/",
    image: "/qaforge.png",
  },
  {
    model: "FX-002", title: "RAGORA", type: "agentic retrieval engine",
    live: true,
    description: "Most RAG setups stop at cosine similarity. This one doesn't.",
    bullets: [
      "hybrid retrieval — vector + full-text + Reciprocal Rank Fusion",
      "strict multi-tenant isolation at DB and API layers",
      "conversation-aware query rewriting from chat history",
      "confidence-gated responses with fallback — hallucinations clipped at the limiter",
    ],
    tech: "python · fastapi · langchain · vector db · postgresql · redis · docker",
    github: "https://github.com/wolfnhk20/ragora/", demo: "https://ragora.vercel.app/",
    image: null,
  },
  {
    model: "FX-003", title: "BLOOM EVENTS", type: "booking & pricing console",
    live: true,
    description: "Full-stack event booking with a multi-step flow and pricing that recalculates as you click.",
    bullets: [
      "Google OAuth + JWT across a multi-step booking flow",
      "dynamic pricing — totals re-render live as services are selected",
      "REST APIs via Spring Boot + JPA for events, packages, bookings",
    ],
    tech: "spring boot · react · postgresql · supabase · oauth 2.0 · jwt",
    github: "https://github.com/wolfnhk20/bloom-events/", demo: "https://bloom-events.vercel.app/",
    image: "/bloom.png",
  },
];

const rackTray = [
  {
    model: "FX-004", title: "EcoWatchAI", note: "wildlife recognition — earned a PMC letter of recognition",
    tech: "python · yolov8 · tensorflow · fastapi",
    github: "https://github.com/wolfnhk20/ecowatchai/",
  },
  {
    model: "FX-005", title: "StudySyncAI", note: "syllabus in → quizzes, flashcards, explanations out",
    tech: "next.js · fastapi · langchain · postgresql",
    github: "https://github.com/wolfnhk20/studysyncai/",
  },
  {
    model: "FX-006", title: "FinDash", note: "personal finance — tracking, analytics, budgets",
    tech: "react · spring boot · postgresql · chart.js",
    github: "https://github.com/wolfnhk20/findash/",
  },
];

const NoSignal = ({ title }: { title: string }) => (
  <div className="w-full aspect-[16/10] flex flex-col items-center justify-center gap-2 select-none">
    <span className="font-mono-data text-[0.65rem] tracking-[0.3em] text-accent/50 uppercase">no video signal</span>
    <span className="font-mono-data text-[0.58rem] tracking-widest text-muted-foreground/60 uppercase">{title} runs headless — audio only</span>
  </div>
);

const ProjectsSection = () => (
  <SectionWrapper id="projects" unit="AK-03" title="MODULES" sub="6 units racked · 3 live outputs">
    {/* Featured modules */}
    <div className="space-y-10 md:space-y-12 mb-14">
      {featured.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={p.model} className="border border-black shadow-[inset_0_1px_0_hsl(42_20%_45%/0.12),0_4px_14px_hsl(0_0%_0%/0.4)] bg-gradient-to-b from-[hsl(40_6%_12.5%)] to-[hsl(40_6%_9.5%)]">
            {/* Module header strip */}
            <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b border-black/80">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono-data text-[0.62rem] tracking-[0.2em] text-accent/80">{p.model}</span>
                <h3 className="font-masthead text-lg md:text-xl tracking-wide text-foreground truncate">{p.title}</h3>
                <span className="hidden sm:inline silk text-[0.55rem]">{p.type}</span>
              </div>
              <span className="flex items-center gap-2 shrink-0">
                <Led color="green" blink={p.live} off={!p.live} />
                <span className="font-mono-data text-[0.55rem] tracking-widest text-muted-foreground uppercase">{p.live ? "live" : "standby"}</span>
              </span>
            </div>

            <div className={`grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 ${flip ? "md:[direction:rtl]" : ""}`}>
              <div className="[direction:ltr]">
                <div className="display-well p-1.5">
                  {p.image ? (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="block group">
                      <img
                        src={p.image}
                        alt={`${p.title} — ${p.type}`}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover object-top grayscale-[45%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </a>
                  ) : (
                    <NoSignal title={p.title} />
                  )}
                </div>
                <p className="mt-2 font-mono-data text-[0.55rem] tracking-widest text-muted-foreground/70 uppercase">
                  display {p.model} · front panel feed
                </p>
              </div>

              <div className="[direction:ltr] flex flex-col">
                <p className="text-sm text-foreground/65 leading-[1.8] mb-4">{p.description}</p>
                <ul className="space-y-2 mb-5 text-xs text-foreground/45 leading-relaxed">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="text-accent/60 shrink-0">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-mono-data text-[0.6rem] tracking-wide text-muted-foreground mb-5">{p.tech}</p>
                <div className="mt-auto flex flex-wrap gap-3">
                  <HwLink href={p.github}>in — source</HwLink>
                  <HwLink href={p.demo}><span className="text-accent">▶</span> out — live</HwLink>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    {/* 1U tray units */}
    <p className="silk text-[0.6rem] mb-3">tray — 1u utility units</p>
    <div className="border-t border-black/80">
      {rackTray.map((p) => (
        <div key={p.model} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3.5 border-b border-black/60 group">
          <span className="font-mono-data text-[0.6rem] tracking-[0.2em] text-accent/70 w-14 shrink-0">{p.model}</span>
          <div className="flex items-center gap-3 min-w-0 md:w-40 shrink-0">
            <Led off />
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="font-masthead text-base tracking-wide text-foreground/85 group-hover:text-accent transition-colors truncate">
              {p.title}
            </a>
          </div>
          <span className="text-xs text-foreground/45 leading-snug flex-1 min-w-0">{p.note}</span>
          <span className="hidden lg:inline font-mono-data text-[0.55rem] tracking-wide text-muted-foreground/60 shrink-0">{p.tech}</span>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="font-mono-data text-[0.6rem] tracking-widest uppercase ink-link text-foreground/50 shrink-0 w-fit">
            source ↗
          </a>
        </div>
      ))}
    </div>

    <p className="mt-6 font-mono-data text-[0.62rem]">
      <a href="https://github.com/wolfnhk20" target="_blank" rel="noopener noreferrer" className="ink-link text-foreground/45 tracking-widest uppercase">
        full inventory on github ↗
      </a>
    </p>
  </SectionWrapper>
);

export default ProjectsSection;
