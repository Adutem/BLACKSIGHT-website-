'use client';

import React, { useState } from "react";

// The Pricing component with mobile responsiveness
export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "ascend" | "pinnacle">("solo");

  return (
    <main className="bg-black text-white min-h-screen flex flex-col font-sans p-4 sm:p-8">
      <section className="flex-grow flex flex-col items-center justify-center text-center max-w-7xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Choose a Pricing Plan</h1>
        <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-2xl">
          Because you deserve tools that save time, boost results, and grow with you.
        </p>

        {/* Responsive button group */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:gap-4 mb-8 w-full max-w-sm sm:max-w-none">
          <button
            className={`w-full sm:w-auto border px-4 py-3 rounded-full transition-colors duration-300 ${
              selectedPlan === "solo"
                ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                : "border-gray-600 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedPlan("solo")}
          >
            Solo Suite
          </button>
          <button
            className={`w-full sm:w-auto border px-4 py-3 rounded-full transition-colors duration-300 ${
              selectedPlan === "ascend"
                ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                : "border-gray-600 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedPlan("ascend")}
          >
            Ascend
          </button>
          <button
            className={`w-full sm:w-auto border px-4 py-3 rounded-full transition-colors duration-300 ${
              selectedPlan === "pinnacle"
                ? "bg-blue-500 border-blue-500 text-white shadow-lg"
                : "border-gray-600 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedPlan("pinnacle")}
          >
            Pinnacle
          </button>
        </div>

        {/* Pricing iframe section with responsive container */}
        <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-2xl">
          {selectedPlan === "solo" && (
            <iframe
              src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTo1MTNKNHdH"
              width="100%"
              height="800"
              frameBorder="0"
              style={{ border: "none" }}
              title="Solo Suite Pricing"
            ></iframe>
          )}
          {selectedPlan === "ascend" && (
            <iframe
              src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTo1MTNKNHdH"
              width="100%"
              height="800"
              frameBorder="0"
              style={{ border: "none" }}
              title="Ascend Pricing"
            ></iframe>
          )}
          {selectedPlan === "pinnacle" && (
            <iframe
              src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTpZTTlibTNY"
              width="100%"
              height="800"
              frameBorder="0"
              style={{ border: "none" }}
              title="Pinnacle Pricing"
            ></iframe>
          )}
        </div>
      </section>
    </main>
  );
};

// A simple App component to render the Pricing component
const App: React.FC = () => {
  return <Pricing />;
};

export default App;
