import React, { useEffect, useRef } from "react";
import { WhatSetsUsApart } from "../components/WhatSetsUsApart";
import { OurMission } from "../components/OurMission";
import { AboutBlacksightAI } from "../components/AboutBlacksightAI";

export const About: React.FC = () => {
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Removed classList.add("animate-in") since styles are removed
        }
      });
    }, observerOptions);

    sectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <main className="p-2 sm:p-8 bg-gray-50 min-h-screen">
      <div 
        ref={sectionRefs[0]} 
        className="my-4 sm:my-16 p-2 sm:p-8 bg-white  sm:rounded-xl "
      >
        <AboutBlacksightAI />
      </div>
      
      <div 
        ref={sectionRefs[1]} 
        className="my-4 sm:my-16 p-2 sm:p-8 bg-white  sm:rounded-xl"
      >
        <OurMission />
      </div>
      
      <div 
        ref={sectionRefs[2]} 
        className="my-4 sm:my-16 p-2 sm:p-8 bg-white  sm:rounded-xl "
      >
        <WhatSetsUsApart />
      </div>
    </main>
  );
};