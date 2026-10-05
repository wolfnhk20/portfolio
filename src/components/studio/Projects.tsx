import { ArrowDown, ArrowUpRight, ChevronDown, Code2, Database, FileSearch, GitBranch, Layers3 } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import "./projects.css";

function usePreviewTilt() {
  const frame = useRef<number>();

  useEffect(() => () => cancelAnimationFrame(frame.current ?? 0), []);

  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    cancelAnimationFrame(frame.current ?? 0);
    event.currentTarget.style.removeProperty("--sp-tilt-x");
    event.currentTarget.style.removeProperty("--sp-tilt-y");
  };

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse" || document.documentElement.dataset.motion === "off" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const element = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current ?? 0);
    frame.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (clientY - rect.top) / rect.height * 2 - 1));
      element.style.setProperty("--sp-tilt-x", `${-y * 6}deg`);
      element.style.setProperty("--sp-tilt-y", `${x * 7}deg`);
    });
  };

  return { onPointerMove: move, onPointerLeave: reset, onPointerCancel: reset };
}

const projects = [
  {
    name: "QAForge",
    category: "AI-powered developer tools",
    description: "An autonomous QA pipeline that audits GitHub commits and produces reports on what needs attention.",
    github: "https://github.com/wolfnhk20/qa-forge/",
    demo: "https://qa-forge.vercel.app/",
    stack: ["FastAPI", "LangGraph", "Next.js", "Supabase"],
    details: [
      "GitHub OAuth connects repositories; webhooks trigger an audit when code changes.",
      "LangGraph agents coordinate code analysis and write the audit reports.",
      "The dashboard streams execution logs so you can follow each audit stage.",
    ],
  },
  {
    name: "Ragora",
    category: "Multi-tenant RAG platform",
    description: "A retrieval engine that combines semantic search, full-text search, and conversation context to support its answers.",
    github: "https://github.com/wolfnhk20/ragora/",
    demo: "https://ragora.vercel.app/",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
    details: [
      "Reciprocal Rank Fusion combines vector and full-text results to find relevant context.",
      "Query rewriting uses earlier messages to keep the search in context.",
      "Database and API isolation keep tenants’ data separate. Confidence gates support fallback responses.",
      "Content hashes and chunk diffing avoid redundant embedding work when documents change.",
    ],
  },
  {
    name: "Bloom Events",
    category: "Full-stack event booking",
    description: "An event booking app with flexible packages and pricing that updates as you choose services.",
    github: "https://github.com/wolfnhk20/bloom-events/",
    demo: "https://bloom-events.vercel.app/",
    stack: ["Spring Boot", "React", "PostgreSQL", "OAuth 2.0"],
    details: [
      "Google OAuth and JWT authentication connect a multi-step booking experience.",
      "Selecting services recalculates pricing throughout the booking flow.",
      "Spring Boot and JPA power REST APIs for events, packages, and bookings.",
    ],
  },
];

const experiments = [
  { name: "EcoWatchAI", description: "Wildlife recognition with computer vision", href: "https://github.com/wolfnhk20/ecowatchai/" },
  { name: "StudySyncAI", description: "From syllabus to quizzes and flashcards", href: "https://github.com/wolfnhk20/studysyncai/" },
  { name: "FinDash", description: "Personal finance, budgets, and analytics", href: "https://github.com/wolfnhk20/findash/" },
];

function ProjectStory({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="sp-story">
      <div className="sp-title-row">
        <div>
          <p className="sp-category">{project.category}</p>
          <h3 data-reveal="rise">{project.name}</h3>
        </div>
        <a className="sp-demo" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live demo (opens in a new tab)`}>
          <ArrowUpRight aria-hidden="true" size={25} />
        </a>
      </div>
      <p className="sp-description">{project.description}</p>
      <ul className="sp-stack" aria-label={`${project.name} technology stack`}>
        {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
      <div className="sp-project-links">
        <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight aria-hidden="true" size={16} /></a>
        <a href={project.github} target="_blank" rel="noopener noreferrer">Source code <Code2 aria-hidden="true" size={16} /></a>
      </div>
      <details className="sp-details">
        <summary>Under the hood <ChevronDown size={18} aria-hidden="true" /></summary>
        <ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      </details>
    </div>
  );
}

function RetrievalSchematic() {
  return (
    <figure className="sp-retrieval" aria-label="Ragora architecture: a conversation-aware query enters vector and full-text search, results combine through reciprocal rank fusion, then pass a confidence gate before a response or fallback.">
      <figcaption>How the retrieval works <span>Architecture schematic</span></figcaption>
      <div className="sp-query"><FileSearch size={18} aria-hidden="true" /><span>Conversation-aware query</span></div>
      <div className="sp-fork" aria-hidden="true" />
      <div className="sp-search-pair">
        <div><Database size={24} aria-hidden="true" /><strong>Vector search</strong><span>Match meaning</span></div>
        <div><Layers3 size={24} aria-hidden="true" /><strong>Full-text search</strong><span>Match language</span></div>
      </div>
      <div className="sp-join" aria-hidden="true" />
      <div className="sp-fusion">Reciprocal rank fusion <ArrowDown size={16} aria-hidden="true" /></div>
      <div className="sp-answer"><span className="sp-answer-dot" aria-hidden="true" />Confidence gate<span>Answer or fallback</span></div>
    </figure>
  );
}

export default function Projects() {
  const tilt = usePreviewTilt();
  return (
    <section className="studio-projects" id="projects" aria-labelledby="sp-heading">
      <div className="wrap">
        <div className="sp-section-intro">
          <h2 id="sp-heading" className="section-heading" data-reveal="rise">Things I’ve built.</h2>
          <p>Try the demos, read the code,<br />or take a look under the hood.</p>
        </div>

        <article className="sp-featured">
          <a className="sp-stage sp-stage-qa" data-reveal="wipe" {...tilt} href={projects[0].demo} target="_blank" rel="noopener noreferrer" aria-label="Explore QAForge live demo (opens in a new tab)">
            <div className="sp-qa-caption" aria-hidden="true"><span><GitBranch size={18} /> From commit to audit report</span><span>QAForge</span></div>
            <div className="sp-qa-orbit sp-qa-orbit-one" aria-hidden="true" />
            <div className="sp-qa-orbit sp-qa-orbit-two" aria-hidden="true" />
            <img className="sp-qa-screen" src="/qaforge.webp" srcSet="/qaforge-960.webp 960w, /qaforge.webp 1919w" sizes="(max-width: 760px) calc(106vw - 47px), (max-width: 1340px) calc(85vw - 109px), 1030px" alt="QAForge dashboard showing a connected repository and streamed audit execution logs" width="1919" height="875" loading="lazy" decoding="async" />
            <span className="sp-stage-visit">Explore project <ArrowUpRight size={18} aria-hidden="true" /></span>
          </a>
          <ProjectStory project={projects[0]} />
        </article>

        <div className="sp-work-pair">
          <article className="sp-project">
            <a className="sp-stage sp-stage-ragora" data-reveal="wipe" href={projects[1].demo} target="_blank" rel="noopener noreferrer" aria-label="Explore Ragora live demo (opens in a new tab)"><RetrievalSchematic /></a>
            <ProjectStory project={projects[1]} />
          </article>
          <article className="sp-project">
            <a className="sp-stage sp-stage-bloom" data-reveal="wipe" {...tilt} href={projects[2].demo} target="_blank" rel="noopener noreferrer" aria-label="Explore Bloom Events live demo (opens in a new tab)">
              <span className="sp-bloom-caption" aria-hidden="true">Book your<br />next event.</span>
              <div className="sp-bloom-flower" aria-hidden="true">✳</div>
              <img className="sp-bloom-screen" src="/bloom.webp" srcSet="/bloom-960.webp 960w, /bloom.webp 1918w" sizes="(max-width: 760px) calc(126vw - 55px), (max-width: 1000px) 50vw, 650px" alt="Bloom Events booking website with package selection and event details" width="1918" height="882" loading="lazy" decoding="async" />
              <span className="sp-stage-visit">Explore project <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
            <ProjectStory project={projects[2]} />
          </article>
        </div>

        <div className="sp-more-work">
          <div className="sp-more-heading"><h3 data-reveal="rise">More projects</h3><a href="https://github.com/wolfnhk20" target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          {experiments.map((project) => (
            <a className="sp-experiment" key={project.name} href={project.href} target="_blank" rel="noopener noreferrer">
              <span>{project.name}</span><span>{project.description}</span><ArrowUpRight aria-hidden="true" size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
