"use client";

import { cn, createSlug } from "@/lib/utils";
import { projectData } from "@/data/project";
import {
  User,
  Briefcase,
  GitBranch,
  Rss,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navLinks = [
  { href: "#about-me", label: "about.md", icon: <User size={18} /> },
  { href: "#experiences", label: "experience.log", icon: <Briefcase size={18} /> },
  { href: "#projects", label: "projects/", icon: <GitBranch size={18} /> },
  /* { href: "#blogs", label: "Blogs", icon: <Rss size={18} /> }, */
];

const SideNav = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState("#about-me");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useEffect(() => {
    const sectionsToObserve = [
      ...navLinks.map((link) => link.href),
      ...projectData.map((p) => `#${createSlug(p.subtitle)}`),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          const newActiveSection = `#${intersectingEntry.target.id}`;
          setActiveSection(newActiveSection);

          if (
            projectData.some(
              (p) => `#${createSlug(p.subtitle)}` === newActiveSection
            )
          ) {
            setIsProjectsOpen(true);
          }
        }
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sectionsToObserve.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    });

    return () => {
      sectionsToObserve.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 border border-primary bg-background text-primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:gap-10 lg:px-6">
        <ul
          className={cn(
            "fixed top-0 left-0 h-full w-64 bg-background border-r border-border p-8 pt-20 flex flex-col gap-4 z-40",
            "transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "lg:sticky lg:top-0 lg:h-auto lg:w-auto lg:bg-transparent lg:border-r-0 lg:p-0 lg:pt-12 lg:translate-x-0"
          )}
        >
          {navLinks.map((link) => {
            if (link.href === "#projects") {
              const isProjectsSectionActive =
                activeSection.startsWith("#projects") ||
                projectData.some(
                  (p) => `#${createSlug(p.subtitle)}` === activeSection
                );

              return (
                <li key={link.href} className="flex flex-col">
                  <button
                    onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                    className={cn(
                      "flex items-center justify-between w-48 px-4 py-2 transition-colors duration-200 border-l-2 border-transparent truncate",
                      isProjectsSectionActive
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {link.icon}
                      <span className="truncate">{link.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform shrink-0",
                        isProjectsOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Collapsible list of projects */}
                  {/*                   <div
                    className={cn(
                      "overflow-hidden transition-[max-height] duration-300 ease-in-out",
                      isProjectsOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <ul className="flex flex-col gap-2 pt-2 pl-8">
                      {projectData.map((project) => {
                        const projectSlug = createSlug(project.subtitle)
                        const projectHref = `#${projectSlug}`
                        return (
                          <li key={projectSlug}>
                            <NavLink
                              href={projectHref}
                              isActive={activeSection === projectHref}
                              onLinkClick={closeSidebar}
                              isSubLink={true}
                            >
                              {project.subtitle}
                            </NavLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div> */}
                </li>
              );
            }

            return (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  isActive={activeSection === link.href}
                  icon={link.icon}
                  onLinkClick={closeSidebar}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
};

export default SideNav;

// NavLink component
const NavLink = ({
  href,
  children,
  isActive,
  icon,
  onLinkClick,
  isSubLink = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  icon?: React.ReactNode;
  onLinkClick?: () => void;
  isSubLink?: boolean;
}) => {
  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className={cn(
        isSubLink
          ? // 👉 For project sub-links: bold + underline only when active
            isActive
            ? "text-sm font-semibold underline"
            : "text-sm"
          : // 👉 For normal nav links
            "flex items-center gap-3 px-4 py-2 transition-colors duration-200 border-l-2 border-transparent text-sm truncate",
        isActive && !isSubLink && "border-primary bg-primary/10 text-primary font-semibold",
        !isSubLink && !isActive && "text-muted-foreground hover:text-primary"
      )}
    >
      {icon}
      <span className={isSubLink ? "truncate" : "truncate"}>{children}</span>
    </Link>
  );
};
