"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TiltCard } from "../ui/tilt-card";
import { TerminalWindow, Typewriter } from "../ui/terminal";
import { socials } from "../layout/footer";

const LINES: { text: string; kind: "cmd" | "out" | "hi" }[] = [
  { text: "$ whoami", kind: "cmd" },
  { text: "DAN // computer engineering @ ITB", kind: "out" },
  { text: "$ cat passion.txt", kind: "cmd" },
  { text: "> cyber security    // break it to secure it", kind: "hi" },
  { text: "> game server dev   // RedM · FiveM", kind: "hi" },
  { text: "$ ./focus --list", kind: "cmd" },
  { text: "[ok] performance  [ok] minimalism  [ok] clean UX", kind: "out" },
];
const TOTAL = LINES.reduce((n, l) => n + l.text.length, 0);
const COLOR = { cmd: "text-foreground", out: "text-muted-foreground", hi: "text-accent" };

function TypedSession() {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(TOTAL);
    const id = setInterval(() => setN((v) => Math.min(v + 1, TOTAL)), 22);
    return () => clearInterval(id);
  }, []);

  let offset = 0;
  return (
    <pre className="p-5 md:p-7 text-sm md:text-base leading-relaxed whitespace-pre-wrap min-h-[17rem]">
      {LINES.map((l, i) => {
        const shown = l.text.slice(0, Math.max(0, n - offset));
        offset += l.text.length;
        if (!shown) return null;
        return (
          <div key={i} className={COLOR[l.kind]}>
            {l.kind === "cmd" ? (
              <>
                <span className="text-primary">$</span>
                {shown.slice(1)}
              </>
            ) : (
              shown
            )}
          </div>
        );
      })}
      <span className="cursor text-primary" />
    </pre>
  );
}

const Intro = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 flex items-center">
      <div className="grid-floor" aria-hidden />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] items-center py-24">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">[sys]</span> neural link established_
          </p>
          <h1
            data-text="ItsMeDAN"
            className="glitch text-5xl md:text-7xl font-black tracking-tighter text-primary"
          >
            ItsMeDAN
          </h1>
          <p className="max-w-md text-muted-foreground">
            <Typewriter text="Writing code that survives production, and finding the holes before anyone else does." speed={28} />
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#about-me"
              className="border border-primary bg-primary px-5 py-2.5 font-bold text-primary-foreground transition hover:bg-transparent hover:text-primary"
            >
              ./about-me
            </Link>
            <Link
              href="#contact"
              className="border border-primary/50 px-5 py-2.5 text-primary transition hover:border-primary"
            >
              ./lets-talk
            </Link>
          </div>
          <ul className="flex gap-5 pt-4 text-muted-foreground">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition hover:text-primary">
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="[perspective:1200px]">
          <div className="lg:[transform:rotateY(-12deg)_rotateX(6deg)] [transform-style:preserve-3d]">
            <TiltCard rotationFactor={8}>
              <TerminalWindow title="0xItsMeDAN: ~ — zsh">
                <TypedSession />
              </TerminalWindow>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
