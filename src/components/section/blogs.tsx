"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import BlogPostCard, { BlogPost } from "@/components/ui/blog/blog-post-card";
import Pagination from "../ui/pagination";
import { blogPosts } from "@/data/blogs";
import { LineShadowText } from "../ui/line-shadow-text";


const POSTS_PER_PAGE = 6;

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [currentPage, blogPosts]);

  useEffect(() => {
    gsap.to(gridRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
    });
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [paginatedPosts]);

  return (
    <section id="blogs" className="py-10 relative overflow-hidden h-screen">
      <h2 className="text-4xl font-semibold  mb-10">Blogs</h2>
      {blogPosts.length == 0 ? <div className="grid place-items-center">
        <h4 className="text-6xl font-bold">
          <LineShadowText shadowColor="#ffff" >Coming</LineShadowText>{" "}
          <LineShadowText shadowColor="#ffff" >Soon</LineShadowText>
        </h4>
      </div> : <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>}

    </section>
  );
};

export default Blogs;
