import SectionWrapper from "./SectionWrapper";
import { Led } from "./hardware";
import { useState, FormEvent } from "react";
import emailjs from "emailjs-com";

const outs = [
  { k: "email", href: "mailto:ayushkulal20@gmail.com", text: "ayushkulal20@gmail.com" },
  { k: "linkedin", href: "https://www.linkedin.com/in/ayushkulal/", text: "in/ayushkulal" },
  { k: "github", href: "https://github.com/wolfnhk20", text: "wolfnhk20" },
  { k: "instagram", href: "https://www.instagram.com/ayush.strums/", text: "@ayush.strums" },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const validate = () => {
    const e = { name: "", email: "", message: "" }; let ok = true;
    if (!form.name.trim()) { e.name = "required"; ok = false; }
    if (!form.email.trim()) { e.email = "required"; ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "invalid email"; ok = false; }
    if (!form.message.trim()) { e.message = "required"; ok = false; }
    setErrors(e); return ok;
  };

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!validate()) return;
    // Honeypot — bots fill every field; humans never see this one.
    const hp = (e.currentTarget.elements.namedItem("company") as HTMLInputElement)?.value;
    if (hp) { setStatus("signal received. i'll reply soon."); return; }
    setLoading(true);
    const form_el = e.currentTarget;
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form_el, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => { setStatus("signal received. i'll reply soon."); setLoading(false); setForm({ name: "", email: "", message: "" }); form_el.reset(); })
      .catch(() => { setStatus("transmission failed — patch direct to email above."); setLoading(false); });
  };

  return (
    <SectionWrapper id="contact" unit="AK-06" title="I/O" sub="inputs monitored daily">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl">
        <div className="space-y-8">
          <p className="text-sm text-foreground/60 leading-[1.85] max-w-sm">
            Got a project, an internship, or a strong opinion about retrieval
            strategies? Patch into any output below, or push signal through the
            input stage on the right.
          </p>
          <div className="max-w-sm">
            <p className="silk text-[0.6rem] mb-2">direct outs</p>
            <div className="font-mono-data text-[0.68rem]">
              {outs.map((o) => (
                <div key={o.k} className="flex items-baseline py-2">
                  <span className="text-accent/80 uppercase tracking-widest shrink-0">{o.k}</span>
                  <span className="leader" />
                  <a href={o.href}
                    target={o.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="ink-link text-foreground/60">
                    {o.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={send} className="space-y-4 relative">
          <p className="silk text-[0.6rem]">input stage</p>
          <div>
            <input type="text" name="name" placeholder="YOUR NAME" aria-label="your name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="hw-input" />
            {errors.name && <p className="text-primary text-[0.65rem] mt-1.5 font-mono-data tracking-widest uppercase">⚠ {errors.name}</p>}
          </div>
          {/* Honeypot field — hidden from humans, catches bots */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />
          <div>
            <input type="email" name="email" placeholder="YOUR EMAIL" aria-label="your email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="hw-input" />
            {errors.email && <p className="text-primary text-[0.65rem] mt-1.5 font-mono-data tracking-widest uppercase">⚠ {errors.email}</p>}
          </div>
          <div>
            <textarea name="message" placeholder="YOUR MESSAGE" rows={5} aria-label="your message"
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="hw-input resize-none" />
            {errors.message && <p className="text-primary text-[0.65rem] mt-1.5 font-mono-data tracking-widest uppercase">⚠ {errors.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="hw-btn hw-btn-red disabled:opacity-50 disabled:pointer-events-none">
            ● {loading ? "transmitting…" : "rec / send"}
          </button>
          {status && (
            <p className="flex items-center gap-2 text-[0.65rem] font-mono-data tracking-widest text-foreground/60 uppercase">
              <Led color="green" /> {status}
            </p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
