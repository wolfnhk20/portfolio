import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, Github, Send, Instagram } from "lucide-react";
import { useState } from "react";
import emailjs from "emailjs-com";

const links = [
  { icon: Mail, label: "Email", href: "mailto:ayushkulal20@gmail.com", text: "ayushkulal20@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ayushkulal/", text: "linkedin.com/in/ayushkulal" },
  { icon: Github, label: "GitHub", href: "https://github.com/wolfnhk20", text: "github.com/wolfnhk20" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ayush.strums/", text: "instagram.com/ayush.strums" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_qr9c7td",
        "template_md84yy8",
        e.target,
        "CAppzOVtcAqVWE541"
      )
      .then(() => {
        setStatus("Message sent. I will get back to you soon.");
        setLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        setStatus("Failed to send message. Try again later.");
        setLoading(false);
      });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "", message: "" };

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    // Message
    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

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
          onSubmit={sendEmail}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <textarea
            placeholder="Your message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`w-full bg-secondary/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition resize-none ${errors.message ? "border-red-500" : ""}`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-300 glow-gold hover:glow-gold-hover flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? "Sending..." : (
              <>
                <Send size={14} />
                Send Message
              </>
            )}
          </button>
          {status && (
            <p className="text-sm text-center mt-2 text-primary">
              {status}
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
