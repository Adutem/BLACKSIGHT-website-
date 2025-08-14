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
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Key  Features Of Blacksight  AI</h2>

      <div className="w-full max-w-md sm:max-w-4xl relative">
        {/* Image with text overlay */}
        <div className="relative rounded-lg shadow-lg overflow-hidden ">
          <img
            src={images[activeIndex]}
            alt={`journey-step-${activeIndex}`}
            className="w-full h-64 sm:h-[28rem] object-cover transition-all duration-700"
          />

          {/* Left-aligned Text overlay with even larger font size */}
          <div
            className={` absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-center items-start text-left p-4 sm:p-6 transition-transform duration-500 ${
              animate ? '-translate-y-2 opacity-90' : 'translate-y-0 opacity-100'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className='p-20'>
              <h3 className="text-white font-bold text-3xl sm:text-4xl mb-3">
                {texts[activeIndex].title}
              </h3>
              {texts[activeIndex].description && (
                <p className="text-white/90 mb-3 text-lg sm:text-2xl max-w-2xl">
                  {texts[activeIndex].description}
                </p>
              )}
              {texts[activeIndex].items && texts[activeIndex].items.length > 0 && (
                <ul className="space-y-2 max-w-xl">
                  {texts[activeIndex].items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-white/90 text-lg sm:text-2xl flex items-center"
                    >
                      <span className="mr-3 text-xl sm:text-2xl">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Dots Navigation - now inside the overlay, bottom left */}
            <div className="mt-24 absolute left-0 bottom-0 w-full flex justify-center items-end p-6">
              <div className="flex gap-1 sm:gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition ${
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
