import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sending = useRef(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText('ayushkulal20@gmail.com'); setCopied(true); setCopyFailed(false); }
    catch { setCopyFailed(true); }
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    if (!String(data.get('name') || '').trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') || '').trim())) nextErrors.email = 'Please enter a valid email address.';
    if (!String(data.get('message') || '').trim()) nextErrors.message = 'Write a message before sending.';
    setErrors(nextErrors); setStatus('idle');
    if (Object.keys(nextErrors).length) { (form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement)?.focus(); return; }
    if (data.get('company')) { setStatus('success'); return; }
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key) { setStatus('error'); return; }
    sending.current = true; setStatus('sending');
    try { const { default: emailjs } = await import('emailjs-com'); await emailjs.sendForm(service, template, form, key); form.reset(); setStatus('success'); }
    catch { setStatus('error'); }
    finally { sending.current = false; }
  };
  return <section id="contact" className="studio-contact"><div className="wrap">
    <div className="contact-heading"><span className="section-note">Hiring or planning a project?</span><h2>Let’s talk<span>.</span></h2><ArrowUpRight aria-hidden="true" /></div>
    <div className="contact-grid"><div className="contact-intro">
      <p>If you’re hiring, tell me about the role. If you need a website or web app, tell me what you want to build.</p>
      <div className="email-row"><a href="mailto:ayushkulal20@gmail.com">ayushkulal20@gmail.com</a><button className="icon-button" onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></div>
      <p className="copy-status" role="status">{copyFailed ? 'Select the email address to copy it, or click it to open your email app.' : copied ? 'Email address copied.' : ''}</p>
      <div className="contact-socials"><a href="https://github.com/wolfnhk20" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/ayushkulal/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a><a href="/resume_ayush.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={16} /></a></div>
    </div><form noValidate onSubmit={submit} className="contact-form" aria-label="Send Ayush a message" aria-busy={status === 'sending'}>
      <div className="form-pair">{(['name', 'email'] as const).map(field => <div className="form-field" key={field}><label htmlFor={`contact-${field}`}>{field === 'name' ? 'Your name' : 'Email address'}</label><input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field} maxLength={field === 'name' ? 100 : 254} required readOnly={status === 'sending'} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} placeholder={field === 'name' ? 'What should I call you?' : 'you@example.com'} />{errors[field] && <span className="field-error" id={`${field}-error`}>{errors[field]}</span>}</div>)}</div>
      <div className="form-field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={3} maxLength={5000} required readOnly={status === 'sending'} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Tell me about the role or your project…" />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="contact-company">Company</label><input id="contact-company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <button className="round-link dark-button" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending message…' : 'Send message'}<Send size={17} aria-hidden="true" /></button>
      <div className={`form-status ${status === 'error' ? 'field-error' : ''}`} role="status" aria-live="polite">{status === 'success' && 'Message sent. Thanks for reaching out!'}{status === 'error' && <>Your message couldn’t be sent. Please try again, or <a href="mailto:ayushkulal20@gmail.com">email me directly</a>.</>}</div>
    </form></div>
    <footer className="studio-footer"><a href="#top" className="footer-name">Ayush Kulal<span>© {new Date().getFullYear()}</span></a><span>Based in Pune, India.</span><a href="#top">Back to top <ArrowUpRight size={16} /></a></footer>
  </div></section>;
}
