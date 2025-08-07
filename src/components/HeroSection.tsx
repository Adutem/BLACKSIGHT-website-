import React from "react";
import { Link } from "react-router-dom";

export const HeroSection: React.FC = () => (
  <section className="text-center py-6 sm:py-12 px-2 sm:px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <h3 className="text-sm sm:text-lg font-medium mb-1 sm:mb-2">
        One Platform, Endless Solutions
      </h3>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-8">
        The Leading Customer<br /> 
        Service <span className="text-blue-500">AI Platform</span><br />
        <span className="text-blue-500">for Creators</span>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-3 sm:mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-8 py-1 sm:py-2 rounded-md font-medium transition text-sm sm:text-base">
          Start Free Trial
        </button>
        <Link to="/form-demo">
          <button className="text-blue-500 hover:bg-blue-50 px-4 sm:px-8 py-1 sm:py-2 rounded-md font-medium transition flex items-center text-sm sm:text-base">
            Try Instant Demo <span className="ml-0 sm:ml-1">→</span>
          </button>
        </Link>
      </div>
      <p className="text-gray-600 mb-4 sm:mb-8 text-sm sm:text-base">
        Join The 500+ Agencies Already using Blacksight
      </p>
      
      {/* Animated Logo Container with Two Parallel Lines */}
      <div className="border border-gray-200 rounded-lg p-2 sm:p-6 max-w-4xl mx-auto overflow-hidden">
        {/* First Line - Flowing Right */}
        <div className="flex animate-flow-right mb-2 sm:mb-4 overflow-hidden">
          <div className="flex items-center gap-4 sm:gap-8 min-w-max">
            <img src="/assets/Whatsapp.png" alt="WhatsApp" className="h-4 sm:h-8" />
            <img src="/assets/meta.png" alt="Meta" className="h-4 sm:h-8" />
            <img src="/assets/twilio.png" alt="Twilio" className="h-4 sm:h-8" />
            <img src="/assets/calcom.png" alt="Cal.com" className="h-4 sm:h-8" />
            <img src="/assets/stripe.png" alt="Stripe" className="h-4 sm:h-8" />
            <img src="/assets/calendly.png" alt="Calendly" className="h-4 sm:h-8" />
            <img src="/assets/Clickup.png" alt="ClickUp" className="h-4 sm:h-8" />
            <img src="/assets/airtable.png" alt="Airtable" className="h-4 sm:h-8" />
            <img src="/assets/calendar.png" alt="Calendar" className="h-10 sm:h-20" />
          </div>
        </div>
        
        {/* Second Line - Flowing Left */}
        <div className="flex animate-flow-left overflow-hidden">
          <div className="flex items-center gap-4 sm:gap-8 min-w-max">
            <img src="/assets/Whatsapp.png" alt="WhatsApp" className="h-4 sm:h-8" />
            <img src="/assets/meta.png" alt="Meta" className="h-4 sm:h-8" />
            <img src="/assets/twilio.png" alt="Twilio" className="h-4 sm:h-8" />
            <img src="/assets/calcom.png" alt="Cal.com" className="h-4 sm:h-8" />
            <img src="/assets/stripe.png" alt="Stripe" className="h-4 sm:h-8" />
            <img src="/assets/calendly.png" alt="Calendly" className="h-4 sm:h-8" />
            <img src="/assets/Clickup.png" alt="ClickUp" className="h-4 sm:h-8" />
            <img src="/assets/airtable.png" alt="Airtable" className="h-4 sm:h-8" />
            <img src="/assets/calendar.png" alt="Calendar" className="h-10 sm:h-20" />
          </div>
        </div>
      </div>
    </div>

    {/* CSS Animation */}
    <style jsx>{`
      @keyframes flow-right {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      @keyframes flow-left {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      
      .animate-flow-right {
        animation: flow-right 15s linear infinite;
        width: 200%;
      }
      
      .animate-flow-left {
        animation: flow-left 15s linear infinite;
        width: 200%;
      }
    `}</style>
  </section>
);

export default HeroSection;