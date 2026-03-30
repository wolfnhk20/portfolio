const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Ayush Kulal. Built with passion.
      </p>
      <div className="flex gap-6">
        <a href="https://github.com/wolfnhk20" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition-colors">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ayushkulal/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary text-sm transition-colors">
          LinkedIn
        </a>
        <a href="mailto:ayushkulal20@gmail.com" className="text-muted-foreground hover:text-primary text-sm transition-colors">
          Email
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
