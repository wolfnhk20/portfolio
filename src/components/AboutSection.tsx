import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { MapPin, GraduationCap, Target, Trophy } from "lucide-react";

const details = [
  { icon: MapPin, label: "Location", value: "Pune, India" },
  { icon: GraduationCap, label: "Education", value: "B.E. Computer Engineering - AISSMS COE" },
  { icon: Target, label: "Focus", value: "Scalable backend systems • REST APIs • AI-driven applications" },
  { icon: Trophy, label: "Highlight", value: "Turning ideas into products and music into expression!" },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">About Me</h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
        <p>
          I’m Ayush, a full stack developer and freelance developer who enjoys turning ideas into real, working products. I started out with C, figuring things out from scratch, and gradually moved through Python and the MERN stack before focusing on backend development with Spring Boot.
        </p>
        <p>
          I work on projects that solve real problems, both independently and with clients. From AI-based wildlife detection to PTSD analysis systems, I like building things that go beyond just “another project” and actually create impact.
        </p>
        <p>
          Outside of development, I’m a guitarist. Music has taught me patience, creativity, and discipline the same mindset I bring into coding. Whether it’s refining a guitar solo or building an API, I focus on consistency, clarity, and continuous improvement.
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
