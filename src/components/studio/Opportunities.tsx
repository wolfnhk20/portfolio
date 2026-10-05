import { ArrowUpRight, Code2, Layers, Workflow } from 'lucide-react';
import './opportunities.css';

export default function Opportunities({ intent, setIntent }: { intent: 'hire' | 'build'; setIntent: (intent: 'hire' | 'build') => void }) {
  return <section id="opportunities" className="opportunities"><div className="wrap">
    <div className="opportunity-heading" data-reveal="rise"><p>For teams and freelance clients</p><h2>Let’s work<br />together.</h2></div>
    <div className="opportunity-layout">
      <div className="intent-options" role="group" aria-label="What brings you here?">
        <button type="button" aria-pressed={intent === 'hire'} onClick={() => setIntent('hire')}><span>I’m hiring an engineer</span><ArrowUpRight aria-hidden="true" /></button>
        <button type="button" aria-pressed={intent === 'build'} onClick={() => setIntent('build')}><span>I have a project in mind</span><ArrowUpRight aria-hidden="true" /></button>
      </div>
      <div className="intent-content" key={intent} aria-live="polite">
        {intent === 'hire' ? <><h3>Backend & AI.<br />Hands-on experience.</h3><p>I’m looking for software engineering roles in backend and AI systems. I’ve worked on agent workflows, secure APIs, multi-tenant data, and incident investigation. At Anchorlit, I also delivered client applications from requirements through deployment and maintenance.</p><div className="intent-proof"><span>SpurQLabs</span><span>Anchorlit</span><span>Graduating 2027</span></div><div className="intent-links"><a className="round-link dark-button" href="/resume_ayush.pdf" target="_blank" rel="noreferrer">View my résumé <ArrowUpRight size={18} /></a><a href="#experience">Explore my experience</a></div></> : <><h3>Need a website?<br />Let’s build it.</h3><p>I take on business websites, custom web applications, and AI integrations. I can help you work out what you need, build the frontend and backend, and get it online.</p><ul className="service-list"><li><Code2 size={18} /> Websites & landing pages</li><li><Layers size={18} /> Full-stack web applications</li><li><Workflow size={18} /> AI integrations & automation</li></ul><div className="intent-links"><a className="round-link dark-button" href="#contact">Discuss your project <ArrowUpRight size={18} /></a><a href="#projects">See what I’ve built</a></div></>}
      </div>
    </div>
  </div></section>;
}
