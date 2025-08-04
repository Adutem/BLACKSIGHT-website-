import React from "react";

export const HeroSection: React.FC = () => (
  <section className="text-center py-12 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <h3 className="text-lg font-medium mb-2">
        One Platform, Endless Solutions
      </h3>
      <h1 className="text-5xl md:text-6xl font-bold mb-8">
        The Leading Customer<br /> 
        Service <span className="text-blue-500">AI Platform</span><br />
        <span className="text-blue-500">for Creators</span>
      </h1>
      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-md font-medium transition">
          Start Free Trial
        </button>
        <button className="text-blue-500 hover:bg-blue-50 px-8 py-2 rounded-md font-medium transition flex items-center">
          Try Instant Demo <span className="ml-1">→</span>
        </button>
      </div>
      <p className="text-gray-600 mb-8">
        Join The 500+ Agencies Already using Blacksight
      </p>

      {/* Integration Logos */}
      <div className="border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto flex flex-wrap justify-center gap-8 items-center">
        <img src="/assets/Whatsapp.png" alt="WhatsApp" className="h-8 animate-slide-in" />
        <img src="/assets/meta.png" alt="Meta" className="h-8 animate-slide-in" />
        <img src="/assets/twilio.png" alt="Twilio" className="h-8 animate-slide-in" />
        <img src="/assets/calcom.png" alt="Cal.com" className="h-8 animate-slide-in" />
        <img src="/assets/stripe.png" alt="Stripe" className="h-8 animate-slide-in" />
        <img src="/assets/calendly.png" alt="Calendly" className="h-8 animate-slide-out" />
        <img src="/assets/Clickup.png" alt="ClickUp" className="h-8 animate-slide-out" />
        <img src="/assets/airtable.png" alt="Airtable" className="h-8 animate-slide-out"  />
        <img src="/assets/calendar.png" alt="Calendar" className="h-20 animate-slide-out" />
      </div>
    </div>
  </section>
);

export default HeroSection; // Ensure this line is present