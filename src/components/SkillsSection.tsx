import SectionWrapper from "./SectionWrapper";
import { Jack } from "./hardware";

/* Content sourced from ayushkulal_resume.pdf — keep in sync */
const rows = [
  { bus: "LANG", jacks: ["Java", "Python", "JavaScript", "SQL"] },
  { bus: "BACKEND", jacks: ["Spring Boot", "Spring Sec", "REST API", "FastAPI", "JPA", "Hibernate"] },
  { bus: "AI / ML", jacks: ["MCP", "Agentic AI", "RAG", "LangChain", "LangGraph", "LLM Integr.", "Semantic Srch", "Prompt Eng"] },
  { bus: "DATA", jacks: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Vector DB"] },
  { bus: "FRONT", jacks: ["React", "Next.js", "TypeScript", "Tailwind", "HTML", "CSS"] },
  { bus: "OPS", jacks: ["Docker", "Git", "GitHub", "AWS", "Vercel", "Render", "Railway"] },
  { bus: "TOOLS", jacks: ["Postman", "Maven", "Webhooks", "OAuth 2.0", "JWT"] },
];

const SkillsSection = () => (
  <SectionWrapper id="skills" unit="AK-02" title="PATCHBAY" sub={`${rows.reduce((n, r) => n + r.jacks.length, 0)} points · all normalled`}>
    <p className="text-sm text-foreground/55 leading-relaxed max-w-xl mb-10">
      Every point is wired and carries signal — patch anything into anything.
      The AI/ML bus runs the hottest these days.
    </p>

    <div className="space-y-7">
      {rows.map((row) => (
        <div key={row.bus} className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
          <span className="silk silk-bright text-[0.6rem] w-20 shrink-0 pt-2.5">{row.bus}</span>
          <div className="flex flex-wrap gap-x-2 gap-y-5 group/jack">
            {row.jacks.map((j) => <Jack key={j} label={j} />)}
          </div>
        </div>
      ))}
    </div>

    <p className="mt-10 font-mono-data text-[0.6rem] tracking-widest text-muted-foreground/70 uppercase">
      note: unbalanced connections tolerated. ground loops debugged, not feared.
    </p>
  </SectionWrapper>
);

export default SkillsSection;
