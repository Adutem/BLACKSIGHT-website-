import React from "react";

export const ScheduleCall: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto my-16">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-lg shadow-lg text-white text-center py-16 px-8">
        <h2 className="text-4xl font-bold mb-3">Schedule a call with us</h2>
        <p className="text-lg mb-8">Reserve a 30 minutes call space with our agent using Calendly</p>
        <a 
          href="/get-in-touch" 
          className="inline-block bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-medium py-2 px-6 rounded-md"
        >
          Schedule call
        </a>
      </div>
    </section>
  );
};