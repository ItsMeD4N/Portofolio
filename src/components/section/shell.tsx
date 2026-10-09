"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { projectData } from "@/data/project";
import { DISCORD, socials } from "../layout/footer";

type Line = { text: string; kind: "cmd" | "out" | "hi" | "err" };

const INTRO: Line[] = [
  { text: "$ whoami", kind: "cmd" },
  { text: "DAN // computer engineering @ ITB", kind: "out" },
  { text: "$ cat passion.txt", kind: "cmd" },
  { text: "> cyber security    // break it to secure it", kind: "hi" },
  { text: "> game server dev   // RedM · FiveM", kind: "hi" },
  { text: "# interactive shell ready. type 'help' and hit enter", kind: "out" },
];
const INTRO_LEN = INTRO.reduce((n, l) => n + l.text.length, 0);
const COLOR = { cmd: "text-foreground", out: "text-muted-foreground", hi: "text-accent", err: "text-foreground" };

const SECTIONS: Record<string, string> = {
  "~": "top", about: "about-me", "about.md": "about-me", experience: "experiences",
  "experience.log": "experiences", projects: "projects", "projects/": "projects",
  contact: "contact", "contact.sh": "contact",
};
const GITHUB = socials[0].href;

const out = (...t: string[]): Line[] => t.map((text) => ({ text, kind: "out" }));
const err = (text: string): Line[] => [{ text, kind: "err" }];

function go(target: string) {
  const id = SECTIONS[target];
  if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const COMMANDS: Record<string, { desc: string; run: (args: string[]) => Line[] | Promise<Line[]> }> = {
  help: {
    desc: "list commands",
    run: () => out(...Object.entries(COMMANDS).map(([k, v]) => `  ${k.padEnd(11)}${v.desc}`), "  clear      clear the screen"),
  },
  whoami: { desc: "who is this guy", run: () => out("DAN // computer engineering @ ITB", "cyber security · RedM / FiveM dev · web dev") },
  ls: { desc: "list files", run: () => out("about.md  experience.log  projects/  contact.sh") },
  cd: {
    desc: "jump to a section (cd projects)",
    run: ([dir = "~"]) => (SECTIONS[dir] ? (go(dir), out(`→ ${dir}`)) : err(`cd: no such file or directory: ${dir}`)),
  },
  projects: {
    desc: "list projects",
    run: () => out(...projectData.map((p, i) => `  [${i + 1}] ${p.title.padEnd(9)} ${p.subtitle}`), "type 'open <n>' to launch one"),
  },
  open: {
    desc: "open project <n>",
    run: ([n]) => {
      const p = projectData[Number(n) - 1];
      if (!p) return err("usage: open <n>   (see 'projects')");
      if (p.link === "#") return out(`${p.subtitle}: [private] no public link yet`);
      window.open(p.link, "_blank", "noopener,noreferrer");
      return out(`launching ${p.subtitle} ...`);
    },
  },
  github: {
    desc: "open my github",
    run: () => (window.open(GITHUB, "_blank", "noopener,noreferrer"), out(`opening ${GITHUB} ...`)),
  },
  discord: {
    desc: "copy my discord username",
    run: async () => {
      const copied = await navigator.clipboard.writeText(DISCORD).then(() => true, () => false);
      return out(`discord: ${DISCORD}${copied ? "   [copied to clipboard]" : ""}`);
    },
  },
  contact: { desc: "send me a message", run: () => (go("contact"), out("→ contact.sh")) },
  sudo: {
    desc: "try it",
    run: (args) =>
      args.join(" ") === "hire-me"
        ? (go("contact"), out("[sudo] password for visitor: ********", "access granted. opening contact.sh ..."))
        : err("visitor is not in the sudoers file. This incident will be reported."),
  },
  echo: { desc: "print text", run: (args) => out(args.join(" ")) },
  date: { desc: "print the date", run: () => out(new Date().toString()) },
  rm: { desc: "remove files", run: () => err("rm: permission denied. nice try though.") },
  exit: { desc: "close the session", run: () => out("logout", "...just kidding. you can't leave that easily.") },
};
const NAMES = [...Object.keys(COMMANDS), "clear"];

export default function Shell() {
  const [n, setN] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [history, setHistory] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const ready = n >= INTRO_LEN;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(INTRO_LEN);
    const id = setInterval(() => setN((v) => Math.min(v + 1, INTRO_LEN)), 22);
    return () => clearInterval(id);
  }, []);

  // Keep the newest output in view (scrolls the terminal, not the page).
  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight;
  }, [history]);

  const exec = async (raw: string) => {
    const line = raw.trim();
    const echo: Line = { text: `$ ${line}`, kind: "cmd" };
    if (!line) return setHistory((h) => [...h, echo]);
    setPast((p) => [...p, line]);
    setCursor(-1);
    const [name, ...args] = line.split(/\s+/);
    if (name === "clear") {
      setShowIntro(false);
      return setHistory([]);
    }
    const cmd = COMMANDS[name.toLowerCase()];
    const res = cmd ? await cmd.run(args) : err(`zsh: command not found: ${name}. try 'help'`);
    setHistory((h) => [...h, echo, ...res]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(value);
      setValue("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (!past.length) return;
      const next = e.key === "ArrowUp" ? (cursor === -1 ? past.length - 1 : Math.max(0, cursor - 1)) : cursor === -1 ? -1 : cursor + 1;
      const idx = next >= past.length ? -1 : next;
      setCursor(idx);
      setValue(idx === -1 ? "" : past[idx]);
    } else if (e.key === "Tab") {
      const hits = NAMES.filter((c) => c.startsWith(value.trim()));
      if (value.trim() && hits.length === 1) {
        e.preventDefault();
        setValue(hits[0] + " ");
      }
    }
  };

  let offset = 0;
  const intro = showIntro
    ? INTRO.map((l) => {
        const shown = l.text.slice(0, Math.max(0, n - offset));
        offset += l.text.length;
        return { ...l, text: shown };
      }).filter((l) => l.text)
    : [];

  return (
    <div
      ref={body}
      onClick={() => ready && input.current?.focus({ preventScroll: true })}
      className="h-[20rem] overflow-y-auto p-5 md:p-7 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words cursor-text"
    >
      {[...intro, ...history].map((l, i) => (
        <div key={i} className={COLOR[l.kind]}>
          {l.kind === "cmd" ? (
            <>
              <span className="text-primary">$</span>
              {l.text.slice(1)}
            </>
          ) : (
            l.text
          )}
        </div>
      ))}
      {ready ? (
        <label className="flex items-center gap-2">
          <span className="text-primary">$</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKey}
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-base text-foreground caret-primary outline-none"
          />
        </label>
      ) : (
        <span className="cursor text-primary" />
      )}
    </div>
  );
}
