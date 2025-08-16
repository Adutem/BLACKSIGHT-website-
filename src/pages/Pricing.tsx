'use client';

import React, { useState, useEffect } from "react";

export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "ascend" | "pinnacle">("solo");

  const buttonBaseClasses =
    "w-full sm:w-auto border px-6 py-2 transition-colors duration-300";

  // Map plan to URLs for easier management
  const planUrls: Record<"solo" | "ascend" | "pinnacle", string> = {
    solo: "https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTplUURuUXd4",
    ascend: "https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTo1MTNKNHdH",
    pinnacle: "https://os.voiceaiwrapper.app/en/embed/pricing-table/VGVuYW50UHJpY2luZ1RhYmxlVHlwZTpZTTlibTNY",
  };

  // Set different heights for each plan (desktop and mobile)
  const planHeights: Record<"solo" | "ascend" | "pinnacle", { desktop: number; mobile: number }> = {
    solo: { desktop: 900, mobile: 2000 },
    ascend: { desktop: 900, mobile: 1800 },
    pinnacle: { desktop: 900, mobile: 1500 },
  };

  // Use a ref to force iframe reload on plan change
  const [iframeKey, setIframeKey] = useState(0);

  // Responsive height for iframe based on plan and window size
  const [iframeHeight, setIframeHeight] = useState(
    typeof window !== "undefined" && window.innerWidth < 640
      ? planHeights[selectedPlan].mobile
      : planHeights[selectedPlan].desktop
  );

  useEffect(() => {
    setIframeKey((k) => k + 1);
  }, [selectedPlan]);

  // Adjust iframe height based on window size and selected plan
  useEffect(() => {
    function updateHeight() {
      if (window.innerWidth < 640) {
        setIframeHeight(planHeights[selectedPlan].mobile);
      } else {
        setIframeHeight(planHeights[selectedPlan].desktop);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
    // eslint-disable-next-line
  }, [selectedPlan]);

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

        {/* Button group */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:gap-4 mb-8 w-full max-w-sm sm:max-w-none">
          <button
            className={`${buttonBaseClasses} ${
              selectedPlan === "solo"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white text-white hover:bg-white hover:text-black"
            }`}
            onClick={() => setSelectedPlan("solo")}
          >
            Solo Suite
          </button>
          <button
            className={`${buttonBaseClasses} ${
              selectedPlan === "ascend"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white text-white hover:bg-white hover:text-black"
            }`}
            onClick={() => setSelectedPlan("ascend")}
          >
            Ascend
          </button>
          <button
            className={`${buttonBaseClasses} ${
              selectedPlan === "pinnacle"
                ? "bg-white text-black border-white"
                : "bg-transparent border-white text-white hover:bg-white hover:text-black"
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
          <iframe
            key={iframeKey}
            src={planUrls[selectedPlan]}
            width="100%"
            height={iframeHeight}
            className="w-full border-0 outline-none"
            frameBorder="0"
            scrolling="yes"
            allow="payment *; clipboard-write *; encrypted-media *"
            style={{
              border: "none",
              overflow: "auto",
              width: "100%",
              minHeight:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? `${planHeights[selectedPlan].mobile}px`
                  : `${planHeights[selectedPlan].desktop}px`,
              display: "block",
              background: "white",
            }}
            title={
              selectedPlan === "solo"
                ? "Solo Suite Pricing"
                : selectedPlan === "ascend"
                ? "Ascend Pricing"
                : "Pinnacle Pricing"
            }
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          ></iframe>
          <noscript>
            <div className="text-center text-red-600 p-4">
              Please enable JavaScript to view the pricing table.
            </div>
          </noscript>
        </div>
      </section>
    </main>
  );
};

const App: React.FC = () => {
  return <Pricing />;
};

export default App;
