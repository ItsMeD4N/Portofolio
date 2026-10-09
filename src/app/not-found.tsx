"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TerminalWindow, Typewriter } from "@/components/ui/terminal";

export default function NotFound() {
  const path = usePathname();

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="grid-floor" aria-hidden />
      <div className="relative w-full max-w-xl space-y-6">
        <h1 data-text="404" className="glitch text-7xl md:text-9xl font-black tracking-tighter text-primary">
          404
        </h1>
        <TerminalWindow title="0xItsMeDAN: ~ — zsh">
          <div className="space-y-1 p-5 md:p-7 text-sm md:text-base break-words">
            <p>
              <span className="text-primary">$</span> cd {path}
            </p>
            <p className="text-muted-foreground">zsh: no such file or directory: {path}</p>
            <p>
              <span className="text-primary">$</span> ls ~
            </p>
            <p className="text-muted-foreground">about.md  experience.log  projects/  contact.sh</p>
            <p className="pt-2">
              <span className="text-primary">$</span> <Typewriter text="cd ~" speed={120} />
            </p>
          </div>
        </TerminalWindow>
        <Link
          href="/"
          className="inline-block border border-primary bg-primary px-5 py-2.5 font-bold text-primary-foreground transition hover:bg-transparent hover:text-primary"
        >
          cd ~ (back home)
        </Link>
      </div>
    </main>
  );
}
