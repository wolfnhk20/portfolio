import SectionWrapper from "./SectionWrapper";

const AboutSection = () => (
  <SectionWrapper id="about">
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">About Me</h2>
    <div className="w-16 h-1 bg-primary rounded mb-8" />
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I'm Ayush Kulal — a Java Backend Developer based in Pune with a deep love for building
          robust, scalable applications. My journey started with C programming, moved through Python
          and the MERN stack, and found its home in the Spring Boot ecosystem.
        </p>
        <p>
          Beyond the terminal, I'm a guitarist who plays lead in the college band. Music teaches me
          discipline, timing, and creativity — the same qualities I bring to every line of code.
          Whether it's debugging a tricky API or nailing a solo, I'm all about precision and passion.
        </p>
      </div>
      <div className="glass rounded-xl p-6 space-y-4">
        <InfoRow label="Location" value="Pune, India" />
        <InfoRow label="Education" value="B.E. Computer Engineering — AISSMS COE (CGPA 8.0)" />
        <InfoRow label="Focus" value="Spring Boot · REST APIs · Full-Stack Dev" />
        <InfoRow label="Fun fact" value="1st rank in State Level TechCode War 2k23" />
      </div>
    </div>
  </SectionWrapper>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-xs uppercase tracking-wider text-primary font-medium">{label}</span>
    <p className="text-foreground text-sm mt-0.5">{value}</p>
  </div>
);

export default AboutSection;
