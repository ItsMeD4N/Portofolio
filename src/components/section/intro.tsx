"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Separator } from "../ui/separator";
import { gsap } from "gsap";
import ParticleBackground from "../layout/particle-background";
import { LineShadowText } from "../ui/line-shadow-text";
import Link from "next/link";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import IntroWave from "../../../public/assets/waves/intro-wave";

const Intro = () => {
  const introRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power3.out",
          autoAlpha: 0,
          y: 30,
        }
      });

      tl.from("[data-animation='greeting']", {})
        .from("[data-animation='headline']", {}, "-=0.6")
        .from("[data-animation='paragraph']", {}, "-=0.6")
        .from("[data-animation='cta-button']", {
          stagger: 0.15
        }, "-=0.6")
        .from(".social-sidebar", {
          x: 50,
          y: 0,
        }, "-=0.8");

    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[115vh] w-full overflow-hidden px-2  ">
      <ParticleBackground />
      <div ref={introRef} className="relative z-10 mx-auto grid h-full max-w-6xl place-items-center px-4 sm:px-10 md:px-28 mt-0 md:-mt-20">
        <div className="space-y-8 text-center">
          <h2 data-animation="greeting" className="text-2xl font-medium text-[#F0F0F0] md:text-4xl">
            Hi, I'm Dan
          </h2>
          <h1 data-animation="headline" className="text-4xl font-bold leading-tight md:text-7xl text-[#1b1b1a] text-shadow-accent">
            Passionate about
            <span className="text-[#F0F0F0]"><LineShadowText shadowColor="#ffff">
              reverse
            </LineShadowText>{" "}<LineShadowText shadowColor="#ffff" >
                engineering
              </LineShadowText>

            </span> and
            <span className="text-[#F0F0F0]"><LineShadowText shadowColor="#ffff" >system
            </LineShadowText>
              <LineShadowText shadowColor="#ffff" >
                -
              </LineShadowText>
              <LineShadowText shadowColor="#ffff" >
                level
              </LineShadowText>
              {" "}
              <LineShadowText shadowColor="#ffff" >
                scripting
              </LineShadowText>
            </span>
          </h1>

          <p data-animation="paragraph" className="mx-auto max-w-3xl text-lg text text-[#F0F0F0]">
            Focused on performance, minimalism, and creating clean, intuitive user experiences.
          </p>

          <ul className="flex items-center justify-center gap-4 py-6 md:gap-6">
            <li data-animation="cta-button">
              <InteractiveHoverButton>
                <Link href="#about-me" className="text-lg ">
                  <span >About Me</span>
                </Link>
              </InteractiveHoverButton>

            </li>
            <li data-animation="cta-button">
              <InteractiveHoverButton>
                <Link href="#contact" className="text-lg ">
                  <span >Let's Talk</span>
                </Link>
              </InteractiveHoverButton>
            </li>
          </ul>

          <ul className="social-sidebar lg:absolute -right-24 top-1/2 flex lg:-translate-y-1/2 lg:-rotate-90 transform items-center gap-4 justify-center text-[#F0F0F0] ">
            <li className="lg:rotate-90">
              <a href="#" className="transition-colors  hover:text-black"><Github /></a>
            </li>
            <li className="lg:rotate-90">
              <a href="#" className="transition-colors  hover:text-black"><Linkedin /></a>
            </li>
            <li className="lg:rotate-90">
              <a href="#" className="transition-colors  hover:text-black"><Instagram /></a>
            </li>
            <Separator className="max-w-2 bg-[#F0F0F0]" />
            <Separator className="max-w-8 bg-[#F0F0F0]" />
            <p className="whitespace-nowrap text-sm ">Follow Me</p>
          </ul>
        </div>
      </div >
      <div className=" absolute w-full -bottom-6 left-0">
        <IntroWave />
      </div>
    </section >
  );
}

export default Intro;