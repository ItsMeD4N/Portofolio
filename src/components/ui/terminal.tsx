"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Types `text` out once it scrolls into view. The untyped remainder is rendered
// invisible so the layout doesn't shift; the cursor sits after the typed part.
export function Typewriter({ text, speed = 45, className }: { text: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(text.length);
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let i = 0;
      id = setInterval(() => {
        setN(++i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [text, speed]);

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={cn("cursor", className)}>{text.slice(0, n)}</span>
      <span aria-hidden className="invisible">{text.slice(n)}</span>
    </span>
  );
}

export function TerminalWindow({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("border border-border bg-card/90", className)}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs text-muted-foreground">
        <span className="size-2.5 rounded-full border border-muted-foreground" />
        <span className="size-2.5 rounded-full border border-muted-foreground" />
        <span className="size-2.5 rounded-full bg-muted-foreground" />
        <span className="ml-2 truncate">{title}</span>
      </div>
      {children}
    </div>
  );
}

// Section heading rendered as a shell command: `0xItsMeDAN:~/path$ cmd`
export function Prompt({ path, cmd, className }: { path: string; cmd: string; className?: string }) {
  return (
    <h2 className={cn("text-lg sm:text-xl md:text-3xl font-bold tracking-tight break-words", className)}>
      <span className="text-primary">0xItsMeDAN</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-accent">{path}</span>
      <span className="text-muted-foreground">$ </span>
      <Typewriter text={cmd} />
    </h2>
  );
}
