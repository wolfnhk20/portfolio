import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["Java", "Spring Boot", "Spring MVC", "Node.js", "Express", "Hibernate", "JPA"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Render", "Postman"],
  },
];

const SkillsSection = () => (
  <SectionWrapper id="skills">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">Skills</h2>
    <div className="w-16 h-1 bg-primary rounded mb-10" />
    <div className="grid sm:grid-cols-2 gap-6">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="glass rounded-xl p-6 transition-shadow duration-300 hover:glow-gold"
        >
          <h3 className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium"
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
