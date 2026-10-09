import { formatDate } from "@/lib/utils"
import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import { useMemo } from "react"
import { docs, meta } from "@/.source"
import { Prompt } from "../ui/terminal"

const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

// Fake-but-stable short commit hash for the git-log look.
const shortHash = (s: string) =>
  [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(16).padStart(7, "0").slice(0, 7)

interface ExperienceData {
  title: string
  date: string
  version?: string
  tags?: string[]
  techstack?: string[]
  body: React.ComponentType
}

interface ExperiencePage {
  url: string
  data: ExperienceData
}


const Experience = () => {
  const sortedExperiences = useMemo(() => {
    const allPages = source.getPages() as ExperiencePage[]
    return allPages.sort((a, b) => {
      const dateA = new Date(a.data.date).getTime()
      const dateB = new Date(b.data.date).getTime()
      return dateB - dateA
    })
  }, [])

  return (

    <div id="experiences" className="space-y-10 pt-12 min-h-screen">
      <Prompt path="~/experience" cmd="git log --graph" />
      <div className="relative">
        {sortedExperiences.map((experience) => {
          const MDX = experience.data.body
          const date = new Date(experience.data.date)
          const formattedDate = formatDate(date)

          return (
            <div key={experience.url} className="relative">
              <div className="flex flex-col md:flex-row gap-y-6">
                <div className="md:w-48 flex-shrink-0">
                  <div className="md:sticky md:top-8 pb-10">
                    <div className="text-sm text-muted-foreground">commit {shortHash(experience.url)}</div>
                    <time className="text-xs text-muted-foreground block mb-3">
                      {formattedDate}
                    </time>
                    {experience.data.version && (
                      <span className="text-xs text-accent">tag: v{experience.data.version}</span>
                    )}
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 md:pl-8 relative pb-10">
                  {/* Vertical timeline line */}
                  <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-gradient-to-b from-primary/70 to-border">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                  </div>

                  <div className="space-y-6">
                    <div className="relative z-10 flex flex-col gap-2">
                      <h3 className="text-2xl font-bold tracking-tight text-balance text-primary">
                        {experience.data.title}
                      </h3>

                      {/* Tags */}
                      {experience.data.tags &&
                        experience.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.data.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="h-6 w-fit px-2 text-xs border border-border bg-card/80 text-muted-foreground flex items-center justify-center"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      {/* TechStack */}
                      {experience.data.techstack &&
                        experience.data.techstack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.data.techstack.map((techstack: string) => (
                              <span
                                key={techstack}
                                className="h-6 w-fit px-2 text-xs border border-accent/40 bg-card/80 text-accent flex items-center justify-center"
                              >
                                {techstack}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className="prose dark:prose-invert max-w-none border border-border bg-card p-5 prose-strong:text-primary [&_img]:grayscale prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
                      <MDX />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Experience