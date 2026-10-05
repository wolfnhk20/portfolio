import SectionWrapper from "./SectionWrapper";
import { VUMeter } from "./hardware";

const MusicSection = () => (
  <SectionWrapper id="music" unit="AK-05" title="MONITOR" sub="b-side · analog only">
    <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-start">
      <div className="space-y-5 text-sm text-foreground/60 leading-[1.85] max-w-xl">
        <p>
          The rack metaphor isn't an accident — I actually live behind one.
          Guitar since school: blues, rock, metal, whatever sounds right.
          No loyalty to one genre. You have to actually listen.
        </p>
        <p>
          College band, campus fests, local gigs — rhythm and lead. I've also
          run live sound for stage productions, and you learn more about
          listening from behind a mixer than from behind a guitar.
        </p>
        <p className="font-masthead text-xl md:text-2xl tracking-wide text-foreground/85 uppercase border-l-2 border-primary pl-5">
          Clean tone or clean code — same obsession.
        </p>
        <p className="font-mono-data text-[0.62rem]">
          <a href="https://www.instagram.com/ayush.strums/" target="_blank" rel="noopener noreferrer"
            className="ink-link text-foreground/45 tracking-widest uppercase">
            monitor feed — @ayush.strums ↗
          </a>
        </p>
      </div>

      <div className="flex md:flex-col gap-4 items-center shrink-0">
        <VUMeter label="TONE" duration={2.6} />
        <div className="font-mono-data text-[0.58rem] tracking-widest text-muted-foreground uppercase space-y-1.5 md:text-right">
          <p>genres: blues / rock / metal / jazz / prog</p>
          <p>duties: rhythm · lead · live mixing</p>
          <p>venue: college band · stage productions</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default MusicSection;
