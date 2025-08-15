import React, { useEffect, useState } from 'react';

// Add your image paths here
const images = [
  "./assets/keyfeatures.png",
  "./assets/keyfeatures1.png",
  "./assets/keyfeatures2.png",
  "./assets/keyfeatures3.png",
];

type TextItem = {
  title: string;
  description?: string;
  items?: string[];
};

const initialTexts: TextItem[] = [
  {
    title: "Human Like AI-Agent",
    description: "Blacksight deployed intelligent systems that communucate to customers just like real human staff, capable of handling:",
    items: [
      "Customers support inquiries",
      "Appointments booking",
      "common issue resolution",
    ],
  },
  {
    title: "Omninchannel Support integration",
    description: "Ensuring consistence service delivery regardless of where the customer reach out",
    items: [
      "Website Chat widget",
      "Whatsapp",
      "Facebook Messenger",
      "Email",
    ],
  },
  {
    title: "Self updating Knowledge Base",
    description: "The system learn from interaction and updates its knowledge base dynamically, reducing the need for manual FAQ updates or staff intervention.",
  },
  {
    title: "Workflow Automation Engine",
    description: "BlackSight automates backend tasks like:",
    items: [
      "Lead qualification and routing",
      "Task assignment to human staff",
      "Follow-up reminders  This reduces manual labor and speeds up response times.",
    ],
  },
];

export const JourneyStepCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [texts] = useState<TextItem[]>(initialTexts);
  const [animate, setAnimate] = useState(false);

  // Auto-slide every 3 seconds and trigger animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Trigger animation on manual navigation via dots
  const onDotClick = (index: number) => {
    setActiveIndex(index);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
  };

  return (
    <section className="flex flex-col items-center justify-center py-6 sm:py-10 bg-white">
      {/* Main Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 text-center px-2">Key Features Of Blacksight AI</h2>

      <div className="w-full max-w-full sm:max-w-4xl relative px-0 sm:px-4">
        {/* Image with text overlay */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          <img
            src={images[activeIndex]}
            alt={`journey-step-${activeIndex}`}
            // Increased mobile height from h-56 to h-80 (20rem), sm: remains the same
            className="w-full h-80 sm:h-[28rem] object-cover transition-all duration-700"
          />

          {/* Responsive Text overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end sm:justify-center items-start text-left p-4 sm:p-10 transition-transform duration-500 ${
              animate ? '-translate-y-2 opacity-90' : 'translate-y-0 opacity-100'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="w-full sm:w-auto bg-black/40 sm:bg-transparent rounded-lg sm:rounded-none p-4 sm:p-0 mb-4 sm:mb-0">
              <h3 className="text-white font-bold text-xl sm:text-4xl mb-2 sm:mb-3">
                {texts[activeIndex].title}
              </h3>
              {texts[activeIndex].description && (
                <p className="text-white/90 mb-2 sm:mb-3 text-sm sm:text-2xl max-w-full sm:max-w-2xl">
                  {texts[activeIndex].description}
                </p>
              )}
              {texts[activeIndex].items && texts[activeIndex].items.length > 0 && (
                <ul className="space-y-1 sm:space-y-2 max-w-full sm:max-w-xl">
                  {texts[activeIndex].items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-white/90 text-sm sm:text-2xl flex items-center"
                    >
                      <span className="mr-2 sm:mr-3 text-lg sm:text-2xl">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Dots Navigation - always visible, responsive spacing */}
            <div className="w-full flex justify-center items-end pt-2 sm:pt-8 pb-1 sm:pb-6">
              <div className="flex gap-2 sm:gap-3">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full transition ${
                      idx === activeIndex ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => onDotClick(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
