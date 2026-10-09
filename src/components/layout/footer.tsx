import { Github, Linkedin, MessageSquare } from "lucide-react";

export const socials = [
  { label: "GitHub", href: "https://github.com/itsmed4n", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/itsmed4n", Icon: Linkedin },
  { label: "Discord", href: "https://discord.com/users/itsmed4n", Icon: MessageSquare },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-border px-6 py-5 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p>
          <span className="text-primary">©</span> {new Date().getFullYear()} ItsMeDAN <span className="hidden sm:inline">// exit 0</span>
        </p>
        <div className="flex gap-4">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="transition-colors hover:text-primary">
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
