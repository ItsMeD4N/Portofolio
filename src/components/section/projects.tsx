"use client";

import React from "react";
import { projectData } from "@/data/project";
import { createSlug } from "@/lib/utils";
import { TiltCard } from "@/components/ui/tilt-card";
import { Prompt } from "@/components/ui/terminal";

const Projects = (): React.JSX.Element => {
  return (
    <section id="projects" className="min-h-screen py-12 space-y-10">
      <Prompt path="~/projects" cmd="ls" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectData.map((project, index) => {
          const id = createSlug(project.subtitle);
          const hasImage = project.bgImage.trim().length > 0;

          return (
            <TiltCard
              id={id}
              key={index}
              href={project.link}
              target="_blank"
              className="group relative border border-border bg-card/90 transition-colors duration-300 hover:border-primary"
            >
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2 text-[11px] text-muted-foreground">
                <span className="size-2 rounded-full border border-muted-foreground" />
                <span className="size-2 rounded-full border border-muted-foreground" />
                <span className="size-2 rounded-full bg-muted-foreground" />
                <span className="ml-2 truncate">~/projects/{id}</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden">
                {hasImage ? (
                  <img
                    src={project.bgImage}
                    alt={`${project.title} - ${project.subtitle}`}
                    className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <pre className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_70%)] text-xs leading-tight text-primary/70">
                    {`  ┌──────────────┐\n  │  NO_SIGNAL   │\n  │  01001110 0  │\n  └──────────────┘`}
                  </pre>
                )}
                {/* scanline tint over the preview */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_2px,rgba(0,0,0,0.25)_2px_3px)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="space-y-3 p-5 [transform:translateZ(40px)]">
                <p className="text-xs uppercase tracking-widest text-accent">{project.title}</p>
                <h3 className="text-xl font-bold leading-tight text-primary">
                  {project.subtitle}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-muted-foreground">
                    $ ./run <span className="text-foreground">{id}</span>
                  </span>
                  <span className="border border-primary/50 px-3 py-1 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    exec →
                  </span>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
