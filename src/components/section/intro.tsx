"use client";

import Link from "next/link";
import { TiltCard } from "../ui/tilt-card";
import { TerminalWindow, Typewriter } from "../ui/terminal";
import { SocialLinks } from "../layout/footer";
import Shell from "./shell";

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
          <SocialLinks className="pt-4 text-muted-foreground" />
        </div>

        <div className="[perspective:1200px]">
          <div className="lg:[transform:rotateY(-12deg)_rotateX(6deg)] [transform-style:preserve-3d]">
            <TiltCard rotationFactor={8}>
              <TerminalWindow title="0xItsMeDAN: ~ — zsh">
                <Shell />
              </TerminalWindow>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
