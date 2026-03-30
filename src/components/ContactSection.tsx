import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, Github } from "lucide-react";
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
      <div className="w-16 h-1 bg-primary rounded mb-10" />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Links */}
        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
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
                <l.icon size={18} className="group-hover:text-primary transition-colors" />
                <span className="text-sm">{l.text}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition"
          />
          <textarea
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:brightness-110 transition glow-gold"
          >
            Send Message
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
