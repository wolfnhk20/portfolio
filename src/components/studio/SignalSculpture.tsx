import { useEffect, useRef } from 'react';

/** A procedural signal loop, rendered without a WebGL dependency. */
export default function SignalSculpture({ paused }: { paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let size = 0, frame = 0, last = 0, nextFrame = 0, phase = 0.4;
    let visible = true;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    // Reuse geometry buffers: no thousands of point objects or repeated trig per frame.
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const ringCount = mobile ? 64 : 132;
    const segments = mobile ? 32 : 48;
    // Canvas paint may happen after draw() returns, so budget total work explicitly.
    const frameInterval = 1000 / (mobile ? 24 : 30);
    const phiCos = Float32Array.from({ length: segments + 1 }, (_, j) => Math.cos(j / segments * Math.PI * 2));
    const phiSin = Float32Array.from({ length: segments + 1 }, (_, j) => Math.sin(j / segments * Math.PI * 2));
    const rings = Array.from({ length: ringCount }, (_, i) => {
      const theta = i / ringCount * Math.PI * 2;
      return { theta, cos: Math.cos(theta), sin: Math.sin(theta), depth: 0, points: new Float32Array((segments + 1) * 2) };
    });
    const draw = () => {
      if (!size) return;
      ctx.clearRect(0, 0, size, size);
      const pitch = 0.83 + pointer.y * 0.26 + Math.sin(phase * 0.4) * 0.12;
      const yaw = -0.42 + pointer.x * 0.35;
      const roll = -0.46 + Math.sin(phase * 0.3) * 0.1;
      const cp = Math.cos(pitch), sp = Math.sin(pitch), cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cr = Math.cos(roll), sr = Math.sin(roll), scale = size * .25, center = size / 2;
      const zx = (cp * sy * cr + sp * sr) * scale;
      const zy = (cp * sy * sr - sp * cr) * scale;
      const zd = cp * cy;
      for (const ring of rings) {
        const radius = 1.1 + Math.sin(ring.theta * 3 + phase) * .055;
        const tube = .43 + Math.sin(ring.theta * 2 + phase) * .08;
        // Factor the rotation once per ring instead of repeating it at every vertex.
        const xx = ring.cos * cy + ring.sin * sp * sy;
        const yy = ring.sin * cp;
        const rx = (xx * cr - yy * sr) * scale;
        const ry = (xx * sr + yy * cr) * scale;
        const rd = -ring.cos * sy + ring.sin * sp * cy;
        ring.depth = radius * rd;
        for (let j = 0; j <= segments; j++) {
          const r = radius + tube * phiCos[j], z = tube * phiSin[j];
          const perspective = 4.5 / (4.5 - r * rd - z * zd);
          ring.points[j * 2] = center + (r * rx + z * zx) * perspective;
          ring.points[j * 2 + 1] = center + (r * ry + z * zy) * perspective;
        }
      }
      rings.sort((a, b) => a.depth - b.depth);
      for (const ring of rings) {
        const light = Math.max(0, Math.min(1, (ring.depth + 1.4) / 2.8));
        ctx.beginPath();
        ctx.moveTo(ring.points[0], ring.points[1]);
        for (let j = 1; j <= segments; j++) ctx.lineTo(ring.points[j * 2], ring.points[j * 2 + 1]);
        ctx.closePath();
        ctx.fillStyle = `hsl(231 89% ${26 + light * 24}%)`;
        ctx.fill();
        ctx.strokeStyle = `hsl(230 100% ${49 + light * 23}%)`;
        ctx.lineWidth = size * 0.0022;
        ctx.stroke();
      }
    };
    const tick = (time: number) => {
      frame = 0;
      if (paused || !visible || document.hidden) return;
      if (time >= nextFrame - 1) {
        const elapsed = Math.min(time - last, 100);
        phase += elapsed * 0.00035;
        const follow = 1 - Math.pow(1 - .075, elapsed / (1000 / 30));
        pointer.x += (pointer.tx - pointer.x) * follow;
        pointer.y += (pointer.ty - pointer.y) * follow;
        draw();
        last = time;
        nextFrame += frameInterval;
        if (nextFrame <= time) nextFrame = time + frameInterval;
      }
      frame = requestAnimationFrame(tick);
    };
    const resume = () => { if (!frame && !paused && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const resize = new ResizeObserver(([entry]) => {
      size = entry.contentRect.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = size * dpr; canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(); resume();
    });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    observer.observe(canvas);
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const reset = () => { pointer.tx = 0; pointer.ty = 0; };
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', resume); resume();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', resume); };
  }, [paused]);
  return <canvas ref={ref} className="signal-sculpture" aria-hidden="true" />;
}
