import NeuralBackground from "@/components/layout/neural-background";
import SideNav from "@/components/layout/side-nav";
import Contact from "@/components/section/contact";
import Experience from "@/components/section/experience";
import Intro from "@/components/section/intro";
import Overview from "@/components/section/overview";
import Projects from "@/components/section/projects";

export default function Home() {
  return (
    <div className="relative">
      <NeuralBackground />
      <Intro />
      <SideNav>
        <div className="px-6 lg:px-0">
          <Overview />
          <Experience />
          <Projects />
        </div>
      </SideNav>
      <Contact />
    </div>
  );
}
