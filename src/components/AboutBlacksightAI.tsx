import React from "react";

export const AboutBlacksightAI: React.FC = () => (
  <section className="max-w-4xl mx-auto p-6 bg-blue-50 rounded-lg shadow border border-dashed border-blue-200 text-center">
    <h2 className="text-4xl font-bold text-black mb-6">About Blacksight AI</h2>
    <h3 className="text-2xl font-semibold text-black mb-4">Empowering Businesses with AI Innovation</h3>
    <p className="text-gray-600 mb-6">
      At Blacksight, we are committed to revolutionizing industries through AI-driven automation,
      intelligent decision-making, and enterprise-grade security solutions tailored for the future.
    </p>
    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
      Learn more
    </button>
  </section>
);