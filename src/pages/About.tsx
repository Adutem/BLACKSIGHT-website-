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
          entry.target.classList.add("animate-in");
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
    <>
      <style jsx>{`
        @keyframes slideInFromBottom {
          0% {
            opacity: 0;
            transform: translateY(100px) rotateX(90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px) skewX(-10deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0);
          }
        }

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(100px) skewX(10deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .section-container {
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .section-container.animate-in {
          opacity: 1;
        }

        .section-1.animate-in {
          animation: slideInFromBottom 1s ease-out forwards, float 6s ease-in-out 1s infinite;
        }

        .section-2.animate-in {
          animation: slideInFromLeft 1s ease-out forwards, bounce 2s ease-in-out 1s;
        }

        .section-3.animate-in {
          animation: slideInFromRight 1s ease-out forwards, pulse 2s ease-in-out 1s;
        }

        .section-container:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }

        .section-1:hover {
          animation: float 3s ease-in-out infinite;
        }

        .section-2:hover {
          animation: bounce 1s ease-in-out infinite;
        }

        .section-3:hover {
          animation: pulse 2s infinite;
        }

        .section-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .section-container:hover::before {
          opacity: 1;
        }

        .section-container::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #6366f1);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
          background-size: 400% 400%;
          animation: rotate 15s linear infinite;
        }

        .section-container:hover::after {
          opacity: 1;
        }

        .section-title {
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.5s ease;
        }

        .section-container:hover .section-title::after {
          width: 100%;
        }

        .feature-item {
          position: relative;
          padding-left: 30px;
        }

        .feature-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #6366f1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .section-container:hover .feature-item::before {
          opacity: 1;
        }

        .feature-item:nth-child(1)::before {
          animation-delay: 0.1s;
        }

        .feature-item:nth-child(2)::before {
          animation-delay: 0.2s;
        }

        .feature-item:nth-child(3)::before {
          animation-delay: 0.3s;
        }

        .feature-item:nth-child(4)::before {
          animation-delay: 0.4s;
        }

        .feature-item:nth-child(5)::before {
          animation-delay: 0.5s;
        }

        /* Mobile responsiveness adjustments */
        @media (max-width: 640px) {
          .section-container {
            padding: 4px;
          }

          .section-1.animate-in {
            animation: slideInFromBottom 0.8s ease-out forwards, float 4s ease-in-out 0.8s infinite;
          }

          .section-2.animate-in {
            animation: slideInFromLeft 0.8s ease-out forwards, bounce 1.5s ease-in-out 0.8s;
          }

          .section-3.animate-in {
            animation: slideInFromRight 0.8s ease-out forwards, pulse 1.5s ease-in-out 0.8s;
          }

          .section-1:hover {
            animation: float 2s ease-in-out infinite;
          }

          .section-2:hover {
            animation: bounce 0.8s ease-in-out infinite;
          }

          .section-3:hover {
            animation: pulse 1.5s infinite;
          }

          .my-16 {
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .section-container::after {
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
          }

          .section-title::after {
            height: 2px;
          }

          .feature-item {
            padding-left: 20px;
          }

          .feature-item::before {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>

      <main className="p-2 sm:p-8 bg-gray-50 min-h-screen">
        <div 
          ref={sectionRefs[0]} 
          className="section-container section-1 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"
        >
          <AboutBlacksightAI />
        </div>
        
        <div 
          ref={sectionRefs[1]} 
          className="section-container section-2 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"
        >
          <OurMission />
        </div>
        
        <div 
          ref={sectionRefs[2]} 
          className="section-container section-3 my-4 sm:my-16 p-2 sm:p-8 bg-white rounded-lg sm:rounded-xl shadow-lg relative overflow-hidden transition-all duration-500"
        >
          <WhatSetsUsApart />
        </div>
      </main>
    </>
  );
};