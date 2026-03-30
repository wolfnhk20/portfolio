import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const items = [
  {
    year: "2025",
    title: "Business Development Intern",
    org: "Ayuzera (Virtual)",
    desc: "Managed lead generation, client communication, product promotion, and CRM workflows.",
  },
  {
    year: "2024",
    title: "B.E. Computer Engineering",
    org: "AISSMS COE, Pune",
    desc: "Currently pursuing bachelor's degree with CGPA 8.0. Active member of Technical Committee.",
  },
  {
    year: "2023",
    title: "1st Rank — TechCode War 2k23",
    org: "State Level Competition",
    desc: "Secured 1st among 240 participants at the state-level coding competition.",
  },
  {
    year: "2023",
    title: "Software Development Intern",
    org: "IANT, Pune",
    desc: "Developed modules using Python and Java. Built form, registration, and database-driven components.",
  },
  {
    year: "2024",
    title: "2nd Rank — Techno-Innova'24",
    org: "C Challenge, BVJNOIT Polytechnic",
    desc: "Runner-up at the inter-college technical programming competition.",
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
