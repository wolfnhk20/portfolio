import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, Asterisk, Menu, Pause, Play, X } from 'lucide-react';
import SignalSculpture from '@/components/studio/SignalSculpture';
import Projects from '@/components/studio/Projects';
import Story from '@/components/studio/Story';
import Contact from '@/components/studio/Contact';
import Opportunities from '@/components/studio/Opportunities';
import { useStudioMotion } from '@/components/studio/useStudioMotion';

/* THESIS: A signal studio for a software engineer who plays guitar.
 * OWN-WORLD: Citron fields, cobalt sculpture, open paper, expressive rounded type.
 * STORY: Meet Ayush, explore real systems, understand the engineer, start a conversation.
 * FIRST VIEWPORT: Huge left-aligned name, right kinetic loop, readable role and work link.
 * FORM: A kinetic poster opening into a project gallery, with native scrolling.
 */
const links = [{ label: 'Work', href: '#projects' }, { label: 'About', href: '#about' }, { label: 'Experience', href: '#experience' }, { label: 'Contact', href: '#contact' }];

export default function Index() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(() => { try { return localStorage.getItem('ak-motion-paused') === 'true'; } catch { return false; } });
  const [menuOpen, setMenuOpen] = useState(false);
  const [intent, setIntent] = useState<'hire' | 'build'>('hire');
  const menuButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState('');
  const motionOff = !!reduced || paused;
  useStudioMotion(motionOff);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = motionOff ? 'off' : 'on'; return () => { delete document.documentElement.dataset.motion; }; }, [motionOff]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); }); }, { rootMargin: '-15% 0px -55% 0px' });
    links.forEach(link => { const section = document.querySelector(link.href); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);
  const toggleMotion = () => { const next = !paused; setPaused(next); try { localStorage.setItem('ak-motion-paused', String(next)); } catch { /* Preference still works without storage. */ } };
  return <div className="studio" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="studio-header"><div className="wrap nav-inner">
      <a className="wordmark" href="#top" aria-label="Ayush Kulal, home"><Asterisk size={30} strokeWidth={2.4} aria-hidden="true" /><span>ayush kulal</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined}>{link.label}</a>)}</nav>
      <div className="nav-actions"><button className="motion-toggle" onClick={toggleMotion} disabled={!!reduced} title={reduced ? 'Reduced motion enabled in your device settings' : undefined} aria-label={reduced ? 'Motion off: device preference' : paused ? 'Enable motion' : 'Pause motion'} aria-pressed={motionOff}>{motionOff ? <Play size={13} /> : <Pause size={13} />}<span>Motion {motionOff ? 'off' : 'on'}</span></button><a className="nav-resume" href="/resume_ayush.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a><button ref={menuButton} className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </div>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={21} /></a>)}<a href="#opportunities" onClick={() => setMenuOpen(false)}>Hire / collaborate <ArrowUpRight size={21} /></a><a href="/resume_ayush.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Résumé <ArrowUpRight size={21} /></a></nav>}<span className="reading-progress" aria-hidden="true" /></header>
    <main id="main"><section className="studio-hero" aria-labelledby="hero-title"><div className="wrap hero-wrap">
      <div className="hero-topline"><span>Software engineer / guitarist / biker</span><span>Pune, India <span className="local-dot" /></span></div>
      <div className="hero-composition"><h1 id="hero-title" className="hero-name" aria-label="Ayush Kulal">{['AYUSH', 'KULAL'].map((word, i) => <span className="name-line" key={word} aria-hidden="true"><span>{[...word].map((letter, j) => <span className="hero-letter" key={j} style={{ '--letter-index': i * 3 + j } as CSSProperties}>{letter}</span>)}<span className="name-period">.</span></span></span>)}</h1><div className="hero-object"><SignalSculpture paused={motionOff} /><div className="object-caption"><span className="crosshair" aria-hidden="true">+</span><span>A signal loop.<br />{motionOff ? 'Motion paused.' : 'It follows your pointer.'}</span><span className="object-hint">{motionOff ? 'Enable motion to turn it.' : 'Move your pointer to turn it.'}</span></div></div></div>
      <div className="hero-bottom"><div className="hero-role"><span className="role-mark" aria-hidden="true">↳</span><p>I build backends<br />and AI agents.</p></div><div className="hero-description"><p>I’m looking for engineering roles<br />and taking on freelance web projects.</p><div className="hero-quicklinks"><a href="#experience">Hiring? See my experience</a><a href="#opportunities" onClick={() => setIntent('build')}>Let’s build your website</a></div></div><a href="#projects" className="hero-work"><span>See my work</span><span className="arrow-disc"><ArrowDown size={24} /></span></a></div>
      <div className="hero-footnote"><span><span className="local-dot" /> Currently building AI agents at SpurQLabs</span><span>Projects, experience, and life outside code.</span></div>
    </div></section><Projects /><Opportunities intent={intent} setIntent={setIntent} /><Story /><Contact /></main>
  </div>;
}
