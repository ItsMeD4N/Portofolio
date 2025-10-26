import { formatDate } from "@/lib/utils"
import { loader } from "fumadocs-core/source"
import { createMDXSource } from "fumadocs-mdx"
import { useMemo } from "react"
import { docs, meta } from "@/.source"

const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
})

console.log(source)

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

  console.log(sortedExperiences)

  return (

    <div id="experiences" className="space-y-8 pt-10 min-h-screen">
      <h2 className="text-4xl font-semibold">Experiences</h2>
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
                    <time className="text-sm font-medium text-muted-foreground block mb-3 ">
                      {formattedDate}
                    </time>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 md:pl-8 relative pb-10">
                  {/* Vertical timeline line */}
                  <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
                  </div>

                  <div className="space-y-6">
                    <div className="relative z-10 flex flex-col gap-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-balance">
                        {experience.data.title}
                      </h2>

                      {/* Tags */}
                      {experience.data.tags &&
                        experience.data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.data.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
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
                                className="h-6 w-fit px-2 text-xs font-medium bg-muted text-muted-foreground rounded-full border flex items-center justify-center"
                              >
                                {techstack}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance">
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