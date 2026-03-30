import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Music, Guitar } from "lucide-react";

const MusicSection = () => (
  <SectionWrapper id="music" className="relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute -top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">
      The Other Side
    </h2>
    <div className="w-16 h-1 bg-primary rounded mb-10" />

    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 text-primary">
          <Guitar size={24} />
          <span className="font-semibold tracking-wide uppercase text-sm">Lead Guitarist</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Music is where I find my balance. I play lead guitar in the college band and have
          worked as a sound professional for college dramas. There's something beautiful about
          the way chords and code both demand precision, creativity, and practice.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From rock riffs to fingerstyle melodies, my guitar is never far from reach. It keeps
          me grounded and reminds me that the best things in life — great code, great music —
          take patience and passion.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[260px]"
      >
        <Music size={48} className="text-primary/40 mb-4" />
        <p className="text-muted-foreground text-sm mb-1">Video / Reels coming soon</p>
        <p className="text-muted-foreground/50 text-xs">
          Placeholder for embedded guitar performances
        </p>
      </motion.div>
    </div>
  </SectionWrapper>
);

export default MusicSection;
