"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
};