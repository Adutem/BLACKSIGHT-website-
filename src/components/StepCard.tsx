'use client'; // This component needs to be a Client Component to use hooks like useState, useEffect, useRef

import React, { useEffect, useRef, useState } from 'react';

interface StepCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export const StepCard: React.FC<StepCardProps> = ({ title, description, image, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Stagger the animation for each step
  const animationDelay = `${index * 0.2}s`; // 0s, 0.2s, 0.4s for subsequent cards

  return (
    <>
      <div
        ref={cardRef}
        className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-4xl mx-auto
          ${isVisible ? 'animate-slide-in-from-right-slow-small' : 'opacity-0 translate-x-[30px]'}`}
        style={{ animationDelay }}
      >
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-3">
            <div className="w-1 h-8 bg-blue-500 mr-3 rounded-full" /> {/* Vertical blue line */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-md">{description}</p>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={image || "/placeholder.svg"}
            alt={`Step ${index + 1}: ${title}`}
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto rounded-lg shadow-lg object-cover"
            style={{ aspectRatio: '16/9' }} // Maintain aspect ratio
          />
        </div>
      </div>
      {/* Embedded CSS for animation */}
      <style>{`
        @keyframes slideInFromRightSlowSmall {
          from {
            opacity: 0;
            transform: translateX(30px); /* Start 30px to the right (smaller distance) */
          }
          to {
            opacity: 1;
            transform: translateX(0); /* End at original position */
          }
        }

        .animate-slide-in-from-right-slow-small {
          animation: slideInFromRightSlowSmall 1s ease-out forwards; /* 1 second duration (slower) */
        }
      `}</style>
    </>
  );
};
