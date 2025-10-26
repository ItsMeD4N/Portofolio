import SideNav from "@/components/layout/side-nav";
import Blogs from "@/components/section/blogs";
import Contact from "@/components/section/contact";
import Experience from "@/components/section/experience";
import Intro from "@/components/section/intro";
import Overview from "@/components/section/overview";
import Projects from "@/components/section/projects";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Home() {
  return (
    <div className="relative">
      <AnimatedThemeToggler className="fixed top-4 right-4 z-40 cursor-pointer" />
      <Intro />
      <SideNav>
        <div className="container mx-auto px-6 lg:px-0">
          <Overview />
          <Experience />
        </div>
      </SideNav>
      <Contact />
    </div>
  );
}
