import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { MapPin, GraduationCap, Target, Trophy } from "lucide-react";

const details = [
  { icon: MapPin, label: "Location", value: "Pune, India" },
  { icon: GraduationCap, label: "Education", value: "B.E. Computer Engineering — AISSMS COE (CGPA 8.0)" },
  { icon: Target, label: "Focus", value: "Spring Boot · REST APIs · AI Projects" },
  { icon: Trophy, label: "Highlight", value: "1st rank — State Level TechCode War 2k23" },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">About Me</h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
        <p>
          I'm Ayush Kulal — a Java Backend Developer with a passion for building robust, scalable systems.
          My journey started with C programming, evolved through Python and the MERN stack, and found its
          home in the Spring Boot ecosystem.
        </p>
        <p>
          I'm deeply drawn to AI-powered projects — from wildlife recognition systems to PTSD detection
          applications — where technology can create real impact.
        </p>
        <p>
          Beyond the terminal, I'm a lead guitarist who brings the same discipline, creativity, and precision
          to both code and music. Every riff I play and every API I build shares the same philosophy:
          practice, patience, and passion.
        </p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
              <d.icon size={14} className="text-primary" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">{d.label}</span>
              <p className="text-foreground text-sm mt-0.5">{d.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
