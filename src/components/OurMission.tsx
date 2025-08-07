import React from "react";
import { FaBullseye, FaVrCardboard } from "react-icons/fa";

export const OurMission: React.FC = () => (
  <section className="max-w-4xl mx-auto text-center mb-8 sm:mb-16 px-2 sm:px-0">
    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-8 flex items-center justify-center">
      <FaBullseye className="text-2xl sm:text-3xl mr-2 sm:mr-4 text-black" /> Our Mission
    </h2>
    <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
      Empowering businesses through cutting-edge AI solutions that enhance efficiency, automate
      decision-making, and drive innovation. Our mission is to make AI accessible, adaptable, and
      transformative, helping industries unlock new possibilities and scale effortlessly in the
      digital era.
    </p>
    <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-8 mt-6 sm:mt-12 flex items-center justify-center">
      <FaVrCardboard className="text-2xl sm:text-3xl mr-2 sm:mr-4 text-black" /> Our Vision
    </h2>
    <p className="text-gray-600 text-sm sm:text-base">
      To lead the future of AI-driven transformation by pioneering intelligent automation, adaptive
      decision-making, and seamless human-AI collaboration. We envision a world where businesses
      operate with precision, agility, and unparalleled efficiency redefining industries and shaping
      the next era of technological evolution.
    </p>
  </section>
);