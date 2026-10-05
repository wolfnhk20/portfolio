import { useEffect } from 'react';

/** One observer, native compositor animations, and visible content if JS fails. */
export function useStudioMotion(paused: boolean) {
  useEffect(() => {
    if (paused || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        const mode = element.dataset.reveal;
        const frames: Keyframe[] = mode === 'wipe'
          ? [{ clipPath: 'inset(12% 0 12% 0 round 24px)', transform: 'scale(.96)' }, { clipPath: 'inset(0% 0 0% 0 round 18px)', transform: 'scale(1)' }]
          : mode === 'tilt'
            ? [{ transform: 'translateY(35px) rotate(-5deg)', opacity: .5 }, { transform: 'translateY(0) rotate(0deg)', opacity: 1 }]
            : [{ transform: 'translateY(28px)', opacity: .35 }, { transform: 'translateY(0)', opacity: 1 }];
        const animation = element.animate(frames, { duration: mode === 'wipe' ? 850 : 650, easing: 'cubic-bezier(.16,1,.3,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [paused]);
}
