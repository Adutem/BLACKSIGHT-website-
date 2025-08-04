import React, { useState } from "react";

export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "ascend" | "pinnacle">("solo");

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <section className="flex-grow p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Choose a Pricing Plan</h1>
        <p className="text-gray-300 mb-6">
          Because you deserve tools that save time, boost results, and grow with you.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`border px-4 py-2 rounded ${
              selectedPlan === "solo"
                ? "border-blue-500 text-blue-500"
                : "border-gray-600"
            }`}
            onClick={() => setSelectedPlan("solo")}
          >
            Solo Suite
          </button>
          <button
            className={`border px-4 py-2 rounded ${
              selectedPlan === "ascend"
                ? "border-blue-500 text-blue-500"
                : "border-gray-600"
            }`}
            onClick={() => setSelectedPlan("ascend")}
          >
            Ascend
          </button>
          <button
            className={`border px-4 py-2 rounded ${
              selectedPlan === "pinnacle"
                ? "border-blue-500 text-blue-500"
                : "border-gray-600"
            }`}
            onClick={() => setSelectedPlan("pinnacle")}
          >
            Pinnacle
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
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
              style={{border: "none"}}
>           </iframe>
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
