"use client";

import { useState } from "react";
import { Github, Linkedin, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const DISCORD = "0xitsmedan";

export const socials = [
  { label: "GitHub", href: "https://github.com/ItsMeD4N", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/itsmed4n", Icon: Linkedin },
];

// Discord has no username-based profile URL, so clicking copies the handle instead.
export function CopyDiscord({ showHandle = false, className }: { showHandle?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked (e.g. insecure context): the handle is still visible/hoverable
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      title={`Discord: ${DISCORD} (click to copy)`}
      aria-label={`Copy Discord username ${DISCORD}`}
      className={cn("inline-flex items-center gap-2 transition-colors hover:text-primary", className)}
    >
      <MessageSquare className="size-5 shrink-0" />
      {(showHandle || copied) && <span className="text-xs">{copied ? "copied!" : DISCORD}</span>}
    </button>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      {socials.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-colors hover:text-primary">
          <Icon className="size-5" />
        </a>
      ))}
      <CopyDiscord />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border px-6 py-5 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <p>
          <span className="text-primary">©</span> {new Date().getFullYear()} ItsMeDAN <span className="hidden sm:inline">{"// exit 0"}</span>
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
