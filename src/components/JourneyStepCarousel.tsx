import React, { useEffect, useState } from 'react';

// Add your image paths here. The first image is the one you uploaded (reference ![image1](image1))
const images = [
  "/assets/journey-main.png", 
  "/assets/journey2.png",
  "/assets/journey3.png",
  "/assets/journey4.png",
];

export const JourneyStepCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center py-6 sm:py-12 bg-white">
      <div className="w-full max-w-xs sm:max-w-2xl relative">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <img
            src={images[activeIndex]}
            alt={`journey-step-${activeIndex}`}
            className="w-full h-40 sm:h-64 object-cover transition-all duration-700"
          />
        </div>
        {/* Dots Navigation */}
        <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition ${
                idx === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};