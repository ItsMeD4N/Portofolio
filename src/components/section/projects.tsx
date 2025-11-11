"use client";

import React from "react";
import Link from "next/link";
import { projectData } from "@/data/project";
import { createSlug } from "@/lib/utils";

const Projects = (): React.JSX.Element => {
  return (
    <section id="projects" className="min-h-screen py-8 space-y-8">
      <h2 className="text-4xl font-semibold">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projectData.map((project, index) => {
          const id = createSlug(project.subtitle);
          const hasImage = Boolean(
            project.bgImage && project.bgImage.trim().length > 0
          );

          return (
            <Link
              id={id}
              key={index}
              href={project.link}
              target="_blank"
              className="group relative rounded-2xl border border-primary/40 overflow-hidden bg-background"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {hasImage ? (
                  <img
                    src={project.bgImage}
                    alt={`${project.title} - ${project.subtitle}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="space-y-1">
                    <p className="text-secondary/80 text-xs uppercase tracking-wider">
                      {project.title}
                    </p>
                    <h3 className="text-secondary text-xl font-semibold leading-tight">
                      {project.subtitle}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-primary/80">View project</span>
                  <span
                    className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs border border-primary/40 text-primary/90
                               transition-colors duration-300 group-hover:bg-primary group-hover:text-secondary"
                  >
                    Open
                  </span>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(var(--primary), 0.2), 0 20px 40px -20px rgba(0,0,0,0.6)",
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
