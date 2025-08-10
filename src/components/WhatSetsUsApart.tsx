import React from "react";

export const WhatSetsUsApart: React.FC = () => (
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-start">
      {/* Left Column - Title */}
      <div className="move-right-div padding-left: 20px">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight padding-left: 20px">
    What sets<br />us apart
  </h2>
</div>
      
      {/* Right Column - Features List */}
      <div className="relative">
        {/* Vertical line connecting bullet points */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-500"></div>
        
        {/* Feature Items */}
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <h3 className="text-blue-600 font-bold text-lg mb-2">Adaptive AI Automation</h3>
              <p className="text-gray-600 text-base">
                Smart automation solutions tailored for different industries.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <h3 className="text-blue-600 font-bold text-lg mb-2">Industry-Focused AI</h3>
              <p className="text-gray-600 text-base">
                Specialized AI tools for finance, healthcare, education, and retail.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <h3 className="text-blue-600 font-bold text-lg mb-2">Customizable AI Chatbots</h3>
              <p className="text-gray-600 text-base">
                Build AI assistants that align with your business objectives.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <h3 className="text-blue-600 font-bold text-lg mb-2">Enterprise-Grade Security</h3>
              <p className="text-gray-600 text-base">
                Secure, scalable, and compliant AI solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);