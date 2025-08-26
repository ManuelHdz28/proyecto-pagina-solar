"use client";
import { useEffect, useState, PropsWithChildren } from "react";

export function BackgroundSlideshow({
  images,
  intervalMs = 7000,
  className = "",
  children,
}: PropsWithChildren<{ images: string[]; intervalMs?: number; className?: string }>) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000 will-change-[opacity]"
          style={{ backgroundImage: `url('${src}')`, opacity: i === idx ? 1 : 0 }}
          aria-hidden={i !== idx}
        />
      ))}
      {/* Oscurecer un poco para que el texto se lea */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
