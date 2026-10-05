import { useEffect, useRef, useState } from "react";
import "./story.css";

const roles = [
  {
    company: "SpurQLabs", role: "AI Agent Developer Intern", date: "Jun 2026 — present",
    intro: "Building AI agents for performance testing and marketing workflows.",
    details: [
      "A four-agent performance testing pipeline that turns HAR/Cucumber flows into JMeter plans, runs load, spike, and soak tests, and analyzes JTL results in HTML and JSON reports.",
      "Reusable test flows with dynamic requests, login and JWT refresh, PerfMon server metrics, historical comparisons, and page-level frontend timing.",
      "Helped turn an internal marketing-agent system into a configurable, multi-organization product with 62+ MCP tools, Apollo workflows, and a browser extension.",
      "Organization-aware RAG with PostgreSQL/pgvector, access controls, row-level security, cross-tenant regression tests, and safeguards for untrusted content.",
      "Observability workflows with Datadog, Prometheus, Grafana, Loki, and Promtail to investigate metrics and logs, correlate findings, and report evidence-backed incident candidates.",
    ],
  },
  {
    company: "Anchorlit", role: "Product Lead & Engineer · Self-employed", date: "Jul 2024 — Jun 2026",
    intro: "Took client web applications from requirements to deployment.",
    details: ["Owned requirements, product decisions, engineering, and delivery for client websites and web applications. Built the frontend and backend, including API design, deployment, and maintenance."],
  },
  {
    company: "Codec Technologies", role: "Java Developer Intern", date: "Dec 2025 — Jan 2026",
    intro: "Developing REST APIs and working with relational data.",
    details: ["Built backend services and REST endpoints with Java and Spring Boot, and improved SQL queries for application workflows."],
  },
];

const skillGroups = [
  { title: "Backend foundations", description: "APIs, authentication, and backend services.", tools: ["Java", "Python", "Spring Boot", "Spring Security", "FastAPI", "REST APIs", "OAuth 2.0 / JWT / RBAC"] },
  { title: "AI systems", description: "Agent workflows, retrieval, and tool integrations.", tools: ["MCP / FastMCP", "LangChain", "LangGraph", "RAG", "LLM integrations", "Semantic search", "Prompt engineering"] },
  { title: "Data & delivery", description: "Databases, deployment, and monitoring.", tools: ["PostgreSQL / pgvector", "MySQL", "Redis", "Docker", "AWS", "Grafana / Prometheus", "Datadog / Loki / Promtail"] },
  { title: "The complete picture", description: "Frontend development, integration, and testing.", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "JMeter / PerfMon", "Playwright"] },
];

const strings = [
  { note: "E", name: "low E", frequency: 82.41 },
  { note: "A", name: "A", frequency: 110 },
  { note: "D", name: "D", frequency: 146.83 },
  { note: "G", name: "G", frequency: 196 },
  { note: "B", name: "B", frequency: 246.94 },
  { note: "e", name: "high E", frequency: 329.63 },
];

function Strings() {
  const [sound, setSound] = useState(false);
  const [plucked, setPlucked] = useState<Record<number, number>>({});
  const audio = useRef<AudioContext | null>(null);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => () => { void audio.current?.close(); }, []);

  const pluck = async (index: number) => {
    setPlucked((previous) => ({ ...previous, [index]: (previous[index] ?? 0) + 1 }));
    if (!sound) return;
    try {
      audio.current ??= new AudioContext();
      const context = audio.current;
      await context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = strings[index].frequency;
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, context.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.1);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 1.2);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch {
      setAudioError(true);
      setSound(false);
    }
  };

  return (
    <div className="story-instrument">
      <div className="story-instrument-top">
        <span>Give the strings a try.</span>
        <button className="story-sound" type="button" aria-pressed={sound} onClick={() => { setSound(!sound); setAudioError(false); }}>
          <span aria-hidden="true">{sound ? "◉" : "○"}</span> Sound {sound ? "on" : "off"}
        </button>
      </div>
      <div className="story-strings" aria-label="Interactive guitar strings">
        {strings.map((string, index) => (
          <button type="button" key={string.name} className="story-string" aria-label={`Pluck ${string.name} string`} onClick={() => void pluck(index)}>
            <span className="story-string-note" aria-hidden="true">{string.note}</span>
            <svg key={plucked[index] ?? 0} className={plucked[index] ? "story-string-line is-plucked" : "story-string-line"} viewBox="0 0 500 48" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 0 24 Q 250 24 500 24" fill="none" stroke="currentColor" strokeWidth={2.6 - index * 0.3} vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="story-string-end" aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="story-instrument-hint" aria-live="polite">{audioError ? "Audio isn’t available here. You can still play with the strings." : "Tap a string. Turn sound on to hear it."}</p>
    </div>
  );
}

export default function Story() {
  return (
    <>
      <section id="about" className="story-about" aria-labelledby="story-about-title">
        <div className="wrap story-about-grid">
          <div className="story-about-copy">
            <p className="story-section-label">A bit about me</p>
            <h2 id="story-about-title" data-reveal="rise">I like knowing<br />how things<br />work.</h2>
            <div className="story-about-body">
              <p>I’m Ayush, a software engineer in Pune. I’m interested in how data moves through an application, how AI agents reason, and how the pieces of a system fit together.</p>
              <p>At SpurQLabs, I build agents for performance testing, multi-tenant retrieval, and incident investigation. At Anchorlit, I delivered client websites and web applications from requirements through deployment and maintenance. I like getting into the technical details without losing sight of what the product needs to do.</p>
              <p>I’m looking for engineering opportunities and taking on freelance web development. If you’re building a team or have a website in mind, <a className="story-about-contact" href="#contact">let’s talk</a>.</p>
            </div>
          </div>
          <figure className="story-portrait" data-reveal="tilt">
            <div className="story-portrait-mat"><img src="/ayush-portrait.webp" alt="Ayush Kulal holding up two peace signs" width="800" height="1000" loading="lazy" decoding="async" /></div>
            <figcaption><span>Based in Pune, India</span><span>Engineer, guitarist, biker.</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="experience" className="story-experience wrap" aria-labelledby="story-experience-title">
        <div className="story-section-intro" data-reveal="rise"><h2 id="story-experience-title">Where I’ve<br />worked.</h2><p>Client web applications, backend services, and AI agents. Here’s what I worked on.</p></div>
        <div className="story-roles">
          {roles.map((role) => (
            <details key={role.company} className="story-role">
              <summary>
                <span className="story-role-date">{role.date}</span>
                <span className="story-role-heading"><strong>{role.company}</strong><span>{role.role}</span></span>
                <span className="story-role-intro">{role.intro}</span>
                <span className="story-expand" aria-hidden="true" />
              </summary>
              <div className="story-role-details"><ul>{role.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
            </details>
          ))}
        </div>
        <div className="story-background">
          <div><h3>My education</h3><p><strong>B.E. Computer Engineering</strong><br />AISSMS College of Engineering, Pune<br />2024–2027 <span aria-hidden="true">/</span> CGPA 8.5</p><p><strong>Diploma in Information Technology</strong><br />AISSMS Polytechnic, Pune<br />2021–2024 <span aria-hidden="true">/</span> 88.88%</p></div>
          <div><h3>A couple of proud moments.</h3><p><strong>1st among 240+ participants</strong><br />State TechCode War, 2023</p><p><strong>Recognition for EcoWatchAI</strong><br />Letter of recommendation from Pune Municipal Corporation.</p></div>
        </div>
      </section>

      <section id="skills" className="story-skills wrap" aria-labelledby="story-skills-title">
        <div className="story-section-intro" data-reveal="rise"><h2 id="story-skills-title">What I work with.</h2><p>I choose the stack to suit the problem. These are the tools I use regularly.</p></div>
        <div className="story-skill-grid">{skillGroups.map((group) => (
          <div className="story-skill-group" key={group.title}><h3>{group.title}</h3><p>{group.description}</p><ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
        ))}</div>
      </section>

      <section id="music" className="story-music" aria-labelledby="story-music-title">
        <div className="wrap story-music-grid">
          <div className="story-music-copy">
            <p className="story-section-label">Off the clock</p>
            <h2 id="story-music-title" data-reveal="wipe">Two wheels.<br />Six strings.</h2>
            <p>Outside work, I ride my Honda CB350RS and play guitar.</p>
            <p>I’m into blues, rock, and metal. I play rhythm and lead guitar with my college band, and run live sound for stage productions.</p>
            <a className="story-music-link" href="https://www.instagram.com/ayush.strums/" target="_blank" rel="noopener noreferrer">Hear what I’m playing <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div className="story-offscreen">
            <figure className="story-ride" data-reveal="wipe"><img src="/ayush-cb350rs.webp" srcSet="/ayush-cb350rs-540.webp 540w, /ayush-cb350rs.webp 900w" sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1440px) calc(52vw - 67px), 682px" alt="Ayush on his black Honda CB350RS, wearing a helmet on a city street" width="900" height="1599" loading="lazy" decoding="async" /><figcaption><span>My other daily driver.</span><span>Honda CB350RS ↗</span></figcaption></figure>
            <Strings />
          </div>
        </div>
      </section>
    </>
  );
}
