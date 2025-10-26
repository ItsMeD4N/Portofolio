"use client"

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { projectData } from '@/data/project';
import { createSlug } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Projects = (): React.JSX.Element => {
  const component = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');
    cards.forEach((card) => {
      const cardInner = card.querySelector<HTMLElement>('.content');
      if (!cardInner) return;
      const rotation = gsap.utils.random(-5, 5, 1);
      gsap.set(cardInner, {
        rotation: rotation,
        scale: 1.1,
      });

      gsap.to(cardInner, {
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
      });

      gsap.to(cardInner, {
        y: '+=15',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: gsap.utils.random(1.5, 2.5),
      });
    });
  }, { scope: component });

  return (
    <div ref={component} className="min-h-screen py-8 ">
      <h2 id='projects' className="text-4xl font-semibold sticky top-10 h-[82vh]">Projects</h2>
      <div className="relative space-y-8 -mt-[75vh]">
        {
          projectData.map((project, index) => (
            <Link id={createSlug(project.subtitle)} target='_blank' key={index} href={project.link} className='cursor-pointer hover:scale-150'>
              <div className="project-card sticky top-[10vh] h-[80vh] mx-auto w-11/12 max-w-full">
                <div
                  className="content h-full w-full border-primary border-2 rounded-xl grid place-items-center bg-cover bg-center text-secondary p-8"
                  style={{ backgroundImage: `url(${project.bgImage})` }}
                >
                  <div className="space-y-5 bg-black/70 p-6 rounded-lg">
                    <h3 className="text-center text-4xl md:text-5xl font-bold text-[#F0F0F0]">{project.title}</h3>
                    <h2 className="text-5xl md:text-7xl text-center font-bold text-[#F0F0F0]">{project.subtitle}</h2>
                    <p className="text-center text-lg md:text-xl text-[#F0F0F0]">{project.description}</p>
                  </div>
                </div>
              </div>
            </Link >
          ))
        }
      </div>
    </div>
  );
};

export default Projects;