import React from "react";

export const WhatSetsUsApart: React.FC = () => {
  const items = [
    {
      title: "Adaptive AI Automation",
      desc: "Smart automation solutions tailored for different industries.",
    },
    {
      title: "Industry-Focused AI",
      desc: "Specialized AI tools for finance, healthcare, education, and retail.",
    },
    {
      title: "Customizable AI Chatbots",
      desc: "Build AI assistants that align with your business objectives.",
    },
    {
      title: "Enterprise-Grade Security",
      desc: "Secure, scalable, and compliant AI solutions.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-[#f9fcff] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        
        {/* Left Column */}
        <div className="flex items-start lg:justify-end pr-4 lg:mt-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
            What sets
            <br />
            us apart
          </h2>
        </div>

        {/* Right Column */}
        <div className="relative flex flex-col">
          {/* Full vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#488fff]"
            style={{
              top: "16px", // match circle radius
              bottom: "65px", // match circle radius
            }}
          />

          {items.map((item, idx) => (
            <div key={idx} className="flex items-start relative">
              {/* Circle */}
              <div className="relative flex flex-col items-center z-10">
                <div className="w-8 h-8 rounded-full border-2 border-[#488fff] bg-[#488fff]" />
              </div>

              {/* Text */}
              <div className="ml-4 mb-8">
                <h3
                  className="font-bold text-xl mb-2"
                  style={{ color: "#488fff" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
