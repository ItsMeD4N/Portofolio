import { skills } from "@/data/overview";
import { Marquee } from "../ui/marquee";
import { TiltCard } from "../ui/tilt-card";
import { Prompt, TerminalWindow } from "../ui/terminal";

const stats = [
  { value: "5", label: "years_experience" },
  { value: "30+", label: "projects_shipped" },
  { value: "2+", label: "in_progress" },
];

const services = [
  { name: "redm.dev", body: "Custom RedM scripts, new features, performance tuning and stable servers." },
  { name: "fivem.dev", body: "Custom FiveM scripts, new features, performance tuning and stable servers." },
  { name: "web.dev", body: "Modern websites, features, performance work and secure, scalable apps." },
];

const Hl = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary">{children}</span>
);

const Overview = () => {
  return (
    <div id="about-me" className="space-y-10 pt-12 min-h-screen">
      <Prompt path="~" cmd="cat about.md" />

      <TerminalWindow title="about.md">
        <div className="space-y-4 p-5 md:p-7 leading-relaxed">
          <p className="text-xl md:text-2xl text-foreground">
            <span className="text-muted-foreground"># </span>I&apos;m DAN, a 19-year-old Computer Engineering student at ITB.
          </p>
          <p className="text-muted-foreground">
            Diligent, hardworking and curious. Passionate about <Hl>Cyber Security</Hl> and{" "}
            <Hl>Software Development</Hl>. I specialize as a <Hl>RedM</Hl> and <Hl>FiveM Developer</Hl>,
            writing server scripts that deliver immersive roleplay. I also work as a <Hl>Website Developer</Hl>,
            building responsive sites, shipping features and keeping apps fast, stable and maintainable.
          </p>
        </div>
      </TerminalWindow>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
        {stats.map((s) => (
          <TiltCard key={s.label} className="border border-border bg-card/85 p-6">
            <div className="[transform:translateZ(40px)]">
              <div className="text-5xl font-black text-primary">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          </TiltCard>
        ))}
      </div>

      <div className="space-y-5">
        <Prompt path="~/services" cmd="ls -la" className="text-lg md:text-xl" />
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.name} className="group border border-border bg-card/85 p-6 transition-colors hover:border-primary">
              <div className="[transform:translateZ(30px)] space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>-rwxr-xr-x</span>
                  <span className="text-accent">exec</span>
                </div>
                <h3 className="text-lg font-bold text-primary">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <div className="space-y-5 pb-10">
        <Prompt path="~/skills" cmd="lsmod" className="text-lg md:text-xl" />
        <Marquee pauseOnHover className="[--duration:25s]">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="flex w-28 flex-col items-center gap-2 border border-border bg-card/70 p-3 transition hover:border-primary"
            >
              <img src={skill.link} alt={skill.label} className="size-12 grayscale" />
              <span className="text-xs text-muted-foreground">{skill.label}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Overview;
