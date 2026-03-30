import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, Cpu, Brain, Palette, Users } from "lucide-react";

const projects = [
  {
    title: "AI Wildlife Detection System",
    icon: Cpu,
    description:
      "AI-powered wildlife recognition using Python and TFLite. Processes ~2000 forest images with multiple identification methods. Received a Letter of Recommendation from Pune Municipal Corporation.",
    tech: ["Python", "TFLite", "PyMySQL", "Image Processing"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "PTSD Detection App",
    icon: Brain,
    description:
      "Application leveraging AI and data analysis to assist in early detection of PTSD symptoms, combining medical insights with technology for impactful healthcare solutions.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "Interior Design Website",
    icon: Palette,
    description:
      "Modern, responsive interior design portfolio website with elegant UI, smooth animations, and a content management system for showcasing design projects and client testimonials.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "https://github.com/wolfnhk20",
  },
  {
    title: "Student Networking Platform",
    icon: Users,
    description:
      "Full-stack student networking platform with JWT auth, role-based access, event creation, team management, and real-time collaboration features for academic communities.",
    tech: ["Spring Boot", "Hibernate", "JPA", "MySQL", "REST APIs"],
    github: "https://github.com/wolfnhk20",
  },
];

const ProjectsSection = () => (
  <SectionWrapper id="projects">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">Projects</h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid md:grid-cols-2 gap-5">
      {projects.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="glass rounded-2xl p-6 flex flex-col justify-between transition-shadow duration-300 hover:glow-gold group"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <p.icon size={16} className="text-primary" />
              </div>
              <h3 className="text-base font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {p.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {p.tech.map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-secondary text-primary font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={13} /> View Code
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
