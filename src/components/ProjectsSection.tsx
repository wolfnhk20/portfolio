import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "EcoWatchAI — Wildlife Recognition",
    description:
      "AI-powered wildlife detection system using Python and TFLite. Processes ~2000 forest images with multiple identification methods for improved accuracy. Received a Letter of Recommendation from Pune Municipal Corporation.",
    tech: ["Python", "TFLite", "PyMySQL", "Image Processing"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "PTSD Detection App",
    description:
      "Application leveraging AI and data analysis to assist in early detection of PTSD symptoms, combining medical insights with technology for impactful healthcare solutions.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "Cultural Manager",
    description:
      "Full-stack cultural event management system with JWT auth, role-based access (Admin, Captain, Member), event creation, team management, rehearsal scheduling, and attendance tracking.",
    tech: ["Spring Boot", "Hibernate", "JPA", "MySQL", "REST APIs"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "StudySyncAI",
    description:
      "AI-powered study companion that helps students organize learning materials, track progress, and get intelligent study recommendations for improved academic performance.",
    tech: ["React", "Node.js", "MongoDB", "AI/ML"],
    github: "https://github.com/wolfnhk20",
  },
];

const ProjectsSection = () => (
  <SectionWrapper id="projects">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">Projects</h2>
    <div className="w-16 h-1 bg-primary rounded mb-10" />
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="glass rounded-xl p-6 flex flex-col justify-between transition-shadow duration-300 hover:glow-gold group"
        >
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-primary font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
