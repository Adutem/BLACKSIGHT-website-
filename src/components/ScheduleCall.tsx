import React from "react";

export const ScheduleCall: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto my-8 sm:my-16 px-2 sm:px-0">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-lg shadow-lg text-white text-center py-8 sm:py-16 px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">Schedule a call with us</h2>
        <p className="text-base sm:text-lg mb-4 sm:mb-8">Reserve a 30 minutes call space with our agent using Calendly</p>
        <a 
          href="/get-in-touch" 
          className="inline-block bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium py-1 sm:py-2 px-4 sm:px-6 rounded-md text-sm sm:text-base"
        >
          Schedule call
        </a>
      </div>
    </section>
  );
};