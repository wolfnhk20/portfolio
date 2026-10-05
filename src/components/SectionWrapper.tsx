import { ReactNode } from "react";
import { Panel } from "./hardware";

interface Props {
  id: string;
  unit: string;      // "AK-01"
  title: string;     // "PREAMP"
  sub?: string;      // right-aligned mono note
  children: ReactNode;
}

/** A rack unit: faceplate panel with unit tag header and groove. */
const SectionWrapper = ({ id, unit, title, sub, children }: Props) => (
  <section id={id} className="px-2.5 md:px-4 pt-6 md:pt-8">
    <Panel className="max-w-5xl mx-auto">
      <header className="px-6 md:px-10 pt-6 md:pt-7 pb-4 flex items-baseline justify-between gap-4">
        <div className="unit-tag">
          <span className="unit-num">{unit}</span>
          <span className="silk silk-bright text-sm md:text-base tracking-[0.3em]">{title}</span>
        </div>
        {sub && <span className="font-mono-data text-[0.6rem] text-muted-foreground tracking-widest hidden sm:block">{sub}</span>}
      </header>
      <div className="groove mx-6 md:mx-10" />
      <div className="px-6 md:px-10 py-8 md:py-10">
        {children}
      </div>
    </Panel>
  </section>
);

export default SectionWrapper;
