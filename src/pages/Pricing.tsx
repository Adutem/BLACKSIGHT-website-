'use client';

import React, { useState } from "react";

export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "ascend" | "pinnacle">("solo");

  return (
    <main className="min-h-screen flex flex-col font-sans">
      {/* Top Section - Black */}
      <section className="bg-black text-white flex-grow flex flex-col items-center justify-center text-center p-4 sm:p-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Choose a Pricing Plan
        </h1>
        <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-2xl">
          Because you deserve tools that save time, boost results, and grow with you.
        </p>

        {/* Responsive button group */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:gap-4 mb-8 w-full max-w-sm sm:max-w-none">
          <button
            className={`w-full sm:w-auto border px-6 py-2 transition-colors duration-300 ${
              selectedPlan === "solo"
                ? "bg-black border-white text-white shadow-lg"
                : "border-white hover:bg-white hover:text-black"
            }`}
            onClick={() => setSelectedPlan("solo")}
          >
            Solo Suite
          </button>
          <button
            className={`w-full sm:w-auto border px-6 py-2 transition-colors duration-300 ${
              selectedPlan === "ascend"
                ? "bg-black border-white text-white shadow-lg"
                : "border-white hover:bg-white hover:text-black"
            }`}
            onClick={() => setSelectedPlan("ascend")}
          >
            Ascend
          </button>
          <button
            className={`w-full sm:w-auto border px-6 py-2 transition-colors duration-300 ${
              selectedPlan === "pinnacle"
                ? "bg-black border-white text-white shadow-lg"
                : "border-white hover:bg-white hover:text-black"
            }`}
            onClick={() => setSelectedPlan("pinnacle")}
          >
            Pinnacle
          </button>
        </div>
      </section>
       


       {/* Pricing iframe section - White */}
<section className="bg-white text-black p-0 sm:p-0">
  <div className="w-full max-w-[1600px] mx-auto overflow-hidden">
    {selectedPlan === "solo" && (
      <iframe
        src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTplUURuUXd4"
        width="100%"
        height="1200"
        className="w-full min-h-screen !border-0 outline-none"
        frameBorder="0"
        scrolling="no"
        style={{
          border: "none",
          overflow: "hidden",
        }}
        title="Solo Suite Pricing"
      ></iframe>
    )}
    {selectedPlan === "ascend" && (
      <iframe
        src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTo1MTNKNHdH"
        width="100%"
        height="1200"
        className="w-full min-h-screen !border-0 outline-none"
        frameBorder="0"
        scrolling="no"
        style={{
          border: "none",
          overflow: "hidden",
        }}
        title="Ascend Pricing"
      ></iframe>
    )}
    {selectedPlan === "pinnacle" && (
      <iframe
        src="https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTpZTTlibTNY"
        width="100%"
        height="1200"
        className="w-full min-h-screen !border-0 outline-none"
        frameBorder="0"
        scrolling="no"
        style={{
          border: "none",
          overflow: "hidden",
        }}
        title="Pinnacle Pricing"
      ></iframe>
    )}
  </div>
</section>

    </main>
  );
};

const App: React.FC = () => {
  return <Pricing />;
};

export default App;
