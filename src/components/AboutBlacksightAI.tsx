import React from "react";

export const AboutBlacksightAI: React.FC = () => (
  <section className="max-w-4xl mx-auto p-4 sm:p-6 bg-blue-50 rounded-lg shadow border border-dashed border-blue-200 text-center">
    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">About Blacksight AI</h2>
    <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">Empowering Businesses with AI Innovation</h3>
    <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">
      At Blacksight, we are committed to revolutionizing industries through AI-driven automation,
      intelligent decision-making, and enterprise-grade security solutions tailored for the future.
    </p>
    <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg shadow-md hover:bg-blue-600 transition text-sm sm:text-base">
      Learn more
    </button>
  </section>
);