import { Led } from "./hardware";

// Rack map — order matches the units on the page.
const links = [
  { unit: "01", label: "preamp", href: "#about" },
  { unit: "02", label: "patchbay", href: "#skills" },
  { unit: "03", label: "modules", href: "#projects" },
  { unit: "04", label: "signal path", href: "#experience" },
  { unit: "05", label: "monitor", href: "#music" },
  { unit: "06", label: "i/o", href: "#contact" },
];

/**
 * Cabinet top rail. Always visible — a rack doesn't hide its labels.
 * Mobile gets a native <details> patch list, no JS.
 */
const Navbar = () => (
  <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-black shadow-[0_1px_0_hsl(42_20%_40%/0.15),0_4px_16px_hsl(0_0%_0%/0.5)]">
    <div className="max-w-5xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between py-2.5 gap-4">
        <a href="#" className="flex items-center gap-2.5 min-w-0 group">
          <Led color="green" />
          <span className="font-masthead text-base tracking-wide text-foreground group-hover:text-accent transition-colors leading-none pt-0.5">
            AK-2700
          </span>
          <span className="hidden sm:inline font-mono-data text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase truncate">
            ayush kulal · mainframe
          </span>
        </a>

        <nav className="hidden md:block" aria-label="rack units">
          <ul className="flex items-center gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}
                  className="font-mono-data text-[0.62rem] tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors">
                  <span className="text-foreground/35">{l.unit}</span> {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/ayushkulal_resume.pdf" target="_blank" rel="noopener noreferrer"
                className="font-mono-data text-[0.62rem] tracking-widest uppercase px-2 py-1 bg-primary text-primary-foreground hover:bg-primary/85 transition-colors">
                spec sheet ↓
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile: native details menu */}
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer font-mono-data text-[0.62rem] tracking-widest uppercase border border-border px-2.5 py-1.5 select-none text-foreground/80">
            rack map
          </summary>
          <nav className="absolute right-0 mt-2 w-56 bg-card border border-black shadow-[0_8px_24px_hsl(0_0%_0%/0.6)] z-50" aria-label="rack units">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                className="flex items-baseline gap-2.5 px-4 py-3 font-mono-data text-[0.65rem] tracking-widest uppercase text-foreground/80 border-b border-border/50 last:border-0 hover:text-accent">
                <span className="text-foreground/30">{l.unit}</span> {l.label}
              </a>
            ))}
            <a href="/ayushkulal_resume.pdf" target="_blank" rel="noopener noreferrer"
              className="block px-4 py-3 font-mono-data text-[0.65rem] tracking-widest uppercase bg-primary text-primary-foreground">
              spec sheet (pdf) ↓
            </a>
          </nav>
        </details>
      </div>
    </div>
  </header>
);

export default Navbar;
