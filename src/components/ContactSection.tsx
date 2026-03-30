import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:ayushkulal20@gmail.com", text: "ayushkulal20@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ayushkulal/", text: "linkedin.com/in/ayushkulal" },
  { icon: Github, label: "GitHub", href: "https://github.com/wolfnhk20", text: "github.com/wolfnhk20" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <SectionWrapper id="contact">
      <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient">
        Get in Touch
      </h2>
      <div className="w-12 h-0.5 bg-primary rounded-full mb-10" />

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            Have a project idea, want to collaborate, or just say hello? I'd love to hear from you.
          </p>
          <div className="space-y-4">
            {links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <l.icon size={14} className="text-primary" />
                </div>
                <span className="text-sm">{l.text}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition"
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition"
          />
          <textarea
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-300 glow-gold hover:glow-gold-hover flex items-center justify-center gap-2"
          >
            <Send size={14} />
            Send Message
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
