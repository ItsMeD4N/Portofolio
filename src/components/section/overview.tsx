import { skills } from "@/data/overview";
import { Highlighter } from "../ui/highlighter";
import { Marquee } from "../ui/marquee";
import { Code } from "lucide-react";

const Overview = () => {

  return (
    <div id="about-me" className=" space-y-8 pt-8 min-h-screen ">
      <h2 className="text-4xl font-semibold">About Me</h2>
      <h4 className="text-2xl text-justify">
        I'm Dan, a 19-year-old third-semester Computer Engineering student at ITB.
      </h4>
      <p className="mt-2 text-justify">
        As a diligent, hardworking, and curious individual, I am passionate
        about
        <span className="font-semibold"> Cyber Security </span> and
        <span className="font-semibold"> Software Development </span>, which I
        continue to explore and develop. In addition, I specialize as a{" "}
        <span className="font-semibold">RedM Developer</span>, creating and
        customizing server scripts to deliver immersive roleplay experiences. My
        work includes developing custom features, optimizing performance, and
        ensuring server stability for the best player engagement.
      </p>

      <div className="experiences grid gap-10 grid-cols-1 lg:grid-cols-3 place-items-center">
        <div className="bg-primary text-secondary p-6 rounded-xl text-center flex items-center gap-4 w-full max-w-sm ">
          <span className="text-5xl font-bold">3+</span>
          <span className="text-xl">Year of experience</span>
        </div>

        <div className="bg-primary text-secondary p-6 rounded-xl text-center flex items-center gap-4 w-full max-w-sm">
          <span className="text-5xl font-bold">11+</span>
          <span className="text-xl">Completed projects</span>
        </div>

        <div className="bg-primary text-secondary p-6 rounded-xl text-center flex items-center gap-4 w-full max-w-sm">
          <span className="text-5xl font-bold">1+</span>
          <span className="text-xl">On Going Project</span>
        </div>
      </div>

      {/* Services */}
      <div id="my-service" className="space-y-10 my-20">
        <h4 className="text-2xl">My Service</h4>
        <div className="experiences grid gap-5 grid-cols-1 lg:grid-cols-3 place-items-center ">
          <div className="border-2 border-primary p-2 lg:p-8 rounded-lg w-full max-w-sm">
            <h5 className="text-lg font-semibold flex gap-2"><Code />RedM Developer</h5>
            <p>
              I specialize in developing custom RedM scripts, creating features,
              optimizing performance, and maintaining stable servers
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div id="my-service" className="space-y-10 my-20">
        <h4 className="text-2xl">My Skills</h4>
        <div className="skills flex">
          <Marquee pauseOnHover className="[--duration:20s]">
            {skills.map((skill, index) => (
              <img src={skill.link} key={index} className="w-20" />
            ))}
          </Marquee>
        </div>
      </div>
    </div >
  );
};

export default Overview;