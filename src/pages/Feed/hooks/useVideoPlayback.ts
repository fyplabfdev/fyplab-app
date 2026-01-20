import * as React from "react";

export function useVideoPlayback() {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.playsInline = true;
    el.loop = true;
    el.muted = true; // autoplay policy friendly

    const obs = new IntersectionObserver(
      async ([entry]) => {
        if (!ref.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          try {
            await ref.current.play();
          } catch {
            // ignore autoplay errors
          }
        } else {
          ref.current.pause();
        }
      },
      { threshold: [0, 0.7, 1] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
