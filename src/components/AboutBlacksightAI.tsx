import React from "react";

export const AboutBlacksightAI: React.FC = () => (
  <section className="max-w-lg w-full mx-auto p-3 sm:p-4 md:p-6 bg-blue-50 rounded-lg shadow border border-dashed border-blue-200 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4 md:mb-5">About Blacksight AI</h2>
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black mb-2 sm:mb-3 md:mb-4">Empowering Businesses with AI Innovation</h3>
    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-5">
      At Blacksight, we are committed to revolutionizing industries through AI-driven automation,
      intelligent decision-making, and enterprise-grade security solutions tailored for the future.
    </p>
    <button className="bg-white-500 text-blue-500 px-4 sm:px-5 py-2  shadow-md hover:bg-blue-600 border-blue-500 transition text-sm sm:text-base">
      Learn more
    </button>
  </section>
);