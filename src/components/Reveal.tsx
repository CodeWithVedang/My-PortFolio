import { CSSProperties, ReactNode } from "react";

// Flies the block in from depth each time its face rotates to the front (see .face.active .enter).
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`enter ${className}`} style={{ animationDelay: `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
