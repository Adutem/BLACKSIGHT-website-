import React from 'react';

// Main App component to showcase the responsive ScheduleCall
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans p-4">
      <ScheduleCall />
    </div>
  );
};

export const ScheduleCall: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto my-8 md:my-16 px-4 md:px-0">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-3xl shadow-2xl text-white text-center py-12 md:py-20 px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4">
          Schedule a call with us
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium mb-6 md:mb-10 opacity-90">
          Reserve a 30-minute call with our team to discuss your needs.
        </p>
        <a 
          href="/get-in-touch" 
          className="inline-block bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200 font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full shadow-lg text-sm sm:text-base md:text-lg transform hover:scale-105 transition-transform"
        >
          Schedule call
        </a>
      </div>
    </section>
  );
};

export default App;
