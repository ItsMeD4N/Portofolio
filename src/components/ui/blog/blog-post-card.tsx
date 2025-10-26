"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Calendar, User, ArrowRight } from "lucide-react";

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  imageUrl: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      mousePos.current = { x, y };

      const rotateX = gsap.utils.mapRange(0, height, -8, 8)(y);
      const rotateY = gsap.utils.mapRange(0, width, 8, -8)(x);

      gsap.to(card, {
        duration: 0.7,
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.05,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { left, top } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      gsap.to(overlay, {
        duration: 0.5,
        clipPath: `circle(150% at ${x}px ${y}px)`,
        ease: "power3.inOut",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 1,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "elastic.out(1, 1)",
      });

      gsap.to(overlay, {
        duration: 0.5,
        clipPath: `circle(0% at ${mousePos.current.x}px ${mousePos.current.y}px)`,
        ease: "power3.inOut",
      });
    };

    card.addEventListener("mousemove", handleMouseMove as EventListener);
    card.addEventListener("mouseenter", handleMouseEnter as EventListener);
    card.addEventListener("mouseleave", handleMouseLeave as EventListener);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove as EventListener);
      card.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      card.removeEventListener("mouseleave", handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl shadow-lg transition-shadow duration-300 p-5 cursor-pointer overflow-hidden border border-gray-200"
      style={{ willChange: "transform" }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 bg-primary"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      ></div>

      <div className="relative z-10">
        <div className="relative mb-4 rounded-lg overflow-hidden h-48">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" /* Changed */
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-foreground transition-colors duration-300">
            {post.title}
          </h3>

          <p className="mt-2 text-gray-600 text-sm flex-grow group-hover:text-gray-300 transition-colors duration-300">{post.excerpt}</p>

          <div className="mt-5 border-t border-gray-200 pt-4 flex items-center justify-between text-gray-500 text-xs">
            <span className="flex items-center gap-2">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {post.date}
            </span>
          </div>

          <div className="mt-5 flex items-center text-primary font-medium group-hover:text-primary-foreground group-hover:gap-3 transition-all duration-300">
            Read More <ArrowRight className="ml-1" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;