import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const items = [
  {
    year: "2023 - Present",
    title: "Freelance Web Developer",
    org: "Self-Employed",
    desc: "Developed responsive and client-focused web applications using React and modern tech stack. Built dynamic frontends, integrated APIs, and delivered optimized solutions based on client requirements.",
  },
  {
    year: "2025",
    title: "Business Development Intern",
    org: "Ayuzera (Virtual)",
    desc: "Managed lead generation, client communication, product promotion, and CRM workflows.",
  },
  {
    year: "2023",
    title: "Software Development Intern",
    org: "IANT, Pune",
    desc: "Developed modules using Python and Java. Built form, registration, and database-driven components.",
  },
];

const ExperienceSection = () => (
  <SectionWrapper id="experience">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">
      Experience & Achievements
    </h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/60" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative flex flex-col md:flex-row ${
              i % 2 === 0 ? "md:justify-start" : "md:justify-end"
            }`}
          >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background z-10 mt-1.5" />
            <div className={`ml-10 md:ml-0 md:w-5/12 glass rounded-2xl p-5 hover:glow-gold transition-shadow duration-300 ${
              i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
            }`}>
              <span className="text-primary text-[10px] font-bold tracking-[0.15em] uppercase">{item.year}</span>
              <h3 className="text-foreground font-display font-semibold mt-1 text-sm">{item.title}</h3>
              <p className="text-muted-foreground text-xs mt-0.5">{item.org}</p>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default ExperienceSection;
