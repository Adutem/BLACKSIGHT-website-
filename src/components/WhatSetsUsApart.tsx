import React from "react";

export const WhatSetsUsApart: React.FC = () => (
  <section className="max-w-6xl mx-auto my-16 flex justify-center">
    <div className="bg-blue-50 rounded-xl shadow-sm p-10 relative w-full max-w-5xl">
      <div className="flex flex-row items-start">
        {/* Left Column - Title */}
        <div className="w-1/3 pr-8">
          <h2 className="text-5xl font-bold text-black leading-tight">
            What sets<br />us apart
          </h2>
        </div>
        
        {/* Right Column - Timeline with Features */}
        <div className="w-2/3 flex">
          {/* Timeline Line */}
          <div className="relative mr-6 flex flex-col items-center">
            <div className="w-0.5 h-full bg-gray-200 absolute"></div>
            
            {/* Timeline Dots */}
            <div className="w-4 h-4 rounded-full bg-blue-400 z-10 mt-7 mb-20"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400 z-10 mb-20"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400 z-10 mb-20"></div>
            <div className="w-4 h-4 rounded-full bg-blue-400 z-10"></div>
          </div>
          
          {/* Feature Descriptions */}
          <div className="flex-1">
            <div className="mb-16">
              <p className="text-blue-500 font-medium text-lg mb-1">Adaptive AI Automation</p>
              <p className="text-gray-600">
                Smart automation solutions tailored for different industries.
              </p>
            </div>
            
            <div className="mb-16">
              <p className="text-blue-500 font-medium text-lg mb-1">Industry-Focused AI</p>
              <p className="text-gray-600">
                Specialized AI tools for finance, healthcare, education, and retail.
              </p>
            </div>
            
            <div className="mb-16">
              <p className="text-blue-500 font-medium text-lg mb-1">Customizable AI Chatbots</p>
              <p className="text-gray-600">
                Build AI assistants that align with your business objectives.
              </p>
            </div>
            
            <div>
              <p className="text-blue-500 font-medium text-lg mb-1">Enterprise-Grade Security</p>
              <p className="text-gray-600">
                Secure, scalable, and compliant AI solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);