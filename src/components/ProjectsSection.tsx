import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, Cpu, Brain, Palette, Users } from "lucide-react";

const projects = [
  {
    title: "Financial Dashboard - Role based Access Control",
    icon: Cpu,
    description:
      "A full-stack finance dashboard built with Spring Boot, React, and PostgreSQL, featuring role-based access control for Admin, Analyst, and Viewer. Secured REST APIs using Spring Security and JWT authentication, ensuring controlled data access across user roles. Optimized frontend performance by reducing load time by 40% through parallel API calls, and containerized the backend using Docker for consistent deployment.",
    tech: ["Spring Boot", "JWT", "Supabase", "React"],
    github: "https://github.com/wolfnhk20/findash-frontend/",
    demo: "https://findash-eta-two.vercel.app/",
  },
  {
    title: "EcoWatchAI - Wildlife Detection System",
    icon: Brain,
    description:
      "An AI-powered wildlife detection system using YOLOv8, Flask, and TensorFlow Lite to identify species from field images in real time. Processed over 4000 images with optimized inference for faster performance and reduced memory usage. Developed a user interface to display bounding boxes, species labels, and confidence scores, and received a Letter of Recommendation from Pune Municipal Corporation.",
    tech: ["Python", "YOLOv8", "Flask", "TensorFlow Lite"],
    github: "https://github.com/wolfnhk20/ecowatch-v2/",
    demo: "https://ecowatch.onrender.com/"
  },
  {
    title: "Bloom Events - Event Coordination Platform",
    icon: Palette,
    description:
      "A full-stack event booking platform built with Spring Boot, React, and PostgreSQL, integrating Google OAuth for secure authentication and JWT for API authorization. Designed RESTful APIs for managing events, packages, and services, and implemented a dynamic cost calculation system across a multi-step booking workflow. Deployed using Vercel and Railway with environment-based configuration.",
    tech: ["Spring Boot", "React", "PostgreSQL", "OAuth", "JWT"],
    github: "https://github.com/wolfnhk20/bloom-events/",
    demo: "https://bloom-events.vercel.app/"
  },
  {
    title: "StudySyncAI (Conceptual Project)",
    icon: Users,
    description:
      "AI-powered timetable assistant that helps students organize schedules and manage study time efficiently.Generates structured timetables and optimizes daily planning based on workload.Designed to improve productivity and consistency in study routines.",
    tech: ["Spring Boot", "React Native", "Supabase", "Python", "Scikit-learn"],
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
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
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
