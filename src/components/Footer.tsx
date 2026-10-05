/** Back-of-cabinet serial sticker. */
const Footer = () => (
  <footer className="px-2.5 md:px-4 py-8 md:py-10">
    <div className="max-w-5xl mx-auto flex justify-center md:justify-end">
      <div className="bg-[hsl(40_6%_10%)] border border-black shadow-[0_3px_10px_hsl(0_0%_0%/0.5)] px-5 py-4 w-full max-w-xs -rotate-1">
        <div className="flex items-baseline justify-between mb-2.5">
          <span className="font-masthead text-sm tracking-wide text-foreground/90">AK-2700</span>
          <span className="font-mono-data text-[0.55rem] tracking-widest text-muted-foreground uppercase">mainframe</span>
        </div>
        <div className="barcode mb-2.5 opacity-80" aria-hidden />
        <div className="font-mono-data text-[0.55rem] leading-relaxed text-muted-foreground tracking-wider uppercase">
          <p>ser. no. {new Date().getFullYear()}-PNQ-001</p>
          <p>assembled in pune, india · react / vite / tailwind</p>
          <p>© {new Date().getFullYear()} ayush kulal — no user-serviceable parts inside</p>
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between">
          <span className="font-mono-data text-[0.55rem] tracking-widest text-muted-foreground/70 uppercase">qc: passed ✓</span>
          <a href="#" className="font-mono-data text-[0.55rem] tracking-widest uppercase ink-link text-foreground/45">↑ top of rack</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
