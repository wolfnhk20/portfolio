import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/wolfnhk20", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ayushkulal/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ayushkulal20@gmail.com", label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-border/40 py-8 px-6">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground/60 text-xs">
        © {new Date().getFullYear()} Ayush Kulal. Crafted with passion.
      </p>
      <div className="flex gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
            aria-label={s.label}
          >
            <s.icon size={14} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
