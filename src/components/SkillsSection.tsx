import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Monitor, Server, Database, Wrench } from "lucide-react";

const categories = [
  {
    title: "Backend",
    icon: Server,
    skills: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "REST APIs", "JWT Authentication", "Hibernate", "JPA"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Query Optimization", "Database Design", "Migrations"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git", "GitHub", "Docker", "Vercel", "Render", "Postman", "Maven", "Linux"],
  },
  {
    title: "Frontend",
    icon: Monitor,
    skills: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
  }
];

const SkillsSection = () => (
  <SectionWrapper id="skills">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">Skills</h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid sm:grid-cols-2 gap-5">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="glass rounded-2xl p-6 transition-shadow duration-300 hover:glow-gold group"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <cat.icon size={16} className="text-primary" />
            </div>
            <h3 className="text-primary font-display font-semibold text-sm tracking-wide">
              {cat.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-lg bg-secondary/80 text-secondary-foreground font-medium transition-colors group-hover:bg-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
