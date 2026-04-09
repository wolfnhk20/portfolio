import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { MapPin, GraduationCap, Target, Trophy } from "lucide-react";

const details = [
  { icon: MapPin, label: "Location", value: "Pune, India" },
  { icon: GraduationCap, label: "Education", value: "B.E. Computer Engineering - AISSMS COE" },
  { icon: Target, label: "Focus", value: "Scalable Backend Systems • Secure APIs • Authentication & System Design" },
  { icon: Trophy, label: "Highlight", value: "Building production-ready systems with a focus on performance, security, and real-world impact" },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">About Me</h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
        <p>
          I’m a backend-focused full stack developer specializing in building scalable APIs, secure authentication systems, and production-ready applications using Spring Boot and modern web technologies.
        </p>
        <p>
          I design systems for real-world use cases, including role-based access control, JWT/OAuth authentication, and efficient database operations with optimized queries. I’ve built and deployed applications ranging from AI-based wildlife detection systems to role-based finance dashboards, with a strong focus on performance, scalability, and usability.
        </p>
        <p>
          Outside of development, I’m a guitarist. Music has shaped my discipline, creativity, and consistency—qualities I bring into building reliable and well-structured software systems.
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
