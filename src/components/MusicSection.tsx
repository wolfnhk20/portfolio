import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Music, Guitar, Play } from "lucide-react";

const MusicSection = () => (
  <SectionWrapper id="music" className="relative overflow-hidden">
    <div className="absolute -top-20 right-0 w-80 h-80 bg-primary/[0.03] rounded-full blur-[100px]" />

    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">
      Music & Guitar
    </h2>
    <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-5"
      >
        <div className="flex items-center gap-3 text-primary">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
            <Guitar size={20} />
          </div>
          <span className="font-display font-semibold tracking-wide text-sm">Guitarist</span>
        </div>
        <p className="text-muted-foreground leading-relaxed text-[15px]">
          When I’m not debugging code, I’m probably bending strings on my guitar. I play in the college band and have also worked on sound for stage productions.
        </p>
        <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground/80 text-sm">
          "Same mindset, different mediums. Clean code or clean tone."
        </blockquote>
        <p className="text-muted-foreground leading-relaxed text-[15px]">
          Guitar keeps me sharp. Timing, precision, consistency. Whether it’s a solo or an API, I’m chasing the same thing, getting it right and making it feel effortless.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px] group cursor-pointer hover:glow-gold transition-shadow duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
          <Play size={24} className="text-primary/50 ml-1" />
        </div>
        <p className="text-muted-foreground text-sm font-medium mb-1">New guitar content coming soon.</p>
        <p className="text-muted-foreground/40 text-sm">
          <a href="https://www.instagram.com/ayush.strums/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
            Follow me on Instagram
          </a>
        </p>
      </motion.div>
    </div>
  </SectionWrapper>
);

export default MusicSection;
