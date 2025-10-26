"use client";

import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute w-full bottom-6 px-6 ">
      <Separator className="mb-4 bg-[#F0F0F0]" />
      <div className="flex items-center justify-between text-lg max-w-6xl mx-auto text-[#F0F0F0]">
        <p>© {new Date().getFullYear()} ItsMeDAN</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/itsmed4n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/itsmed4n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://discord.com/users/itsmed4n"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
