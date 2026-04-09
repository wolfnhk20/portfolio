import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-forest/20 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.02] blur-[150px] animate-pulse-glow" />
      </div>

      {/* Grid lines (very subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="container mx-auto px-6 relative z-10 text-center max-w-4xl"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-primary tracking-wide">
            <Sparkles size={12} className="animate-pulse-glow" />
            Freelance Developer • Open to Opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground font-medium tracking-[0.2em] uppercase text-xs mb-6"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-6 text-gradient leading-none"
        >
          Ayush
        </motion.h1>

        {/* Title - split for impact */}
        <motion.div variants={fadeUp} className="space-y-1 mb-6">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            Backend-Focused Full Stack Developer
          </h2>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-primary/80">
            & Guitarist
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed text-sm md:text-base"
        >
          Building Scalable APIs, Secure Systems
          <br className="hidden sm:block" />{" "}
          & Production-Ready Applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-300 glow-gold hover:glow-gold-hover"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            Let's Connect
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
