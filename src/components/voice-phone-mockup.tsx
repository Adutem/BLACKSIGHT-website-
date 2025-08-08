import React, { useState } from "react";
import { PhoneCall, PhoneOff, Signal, Wifi, Battery } from 'lucide-react';

// Main App component to showcase the responsive mockup and its functionality
const PhoneMockup = () => {
  // State for a custom modal to handle button clicks (instead of `alert()`)
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Voice Phone Mockup</h1>
      
      <ResponsiveVoicePhoneMockup
        onAccept={() => setModalMessage("Call accepted!")}
        onDecline={() => setModalMessage("Call declined.")}
      >
        {/* This is the content that will be rendered inside the phone screen */}
        <div className="text-center p-4">
          <h4 className="text-3xl font-extrabold tracking-tight text-black">NOVA AI</h4>
          <p className="text-gray-600 mt-2">Connecting …</p>
        </div>
      </ResponsiveVoicePhoneMockup>

      {/* Custom Modal for alerts */}
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <p className="text-lg font-semibold text-gray-800">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// This is the updated, responsive component
interface ResponsiveVoicePhoneMockupProps {
  children?: React.ReactNode;
  onAccept: () => void;
  onDecline: () => void;
}

const ResponsiveVoicePhoneMockup: React.FC<ResponsiveVoicePhoneMockupProps> = ({ children, onAccept, onDecline }) => {
  return (
    // Main container now uses a responsive width and centers itself
    <div className="relative mx-auto w-full max-w-[340px] aspect-[9/18]">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[42px] border-2 border-zinc-800/70 shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-zinc-900/5" />

      {/* Screen */}
      <div className="absolute inset-[8px] rounded-[36px] bg-white overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-black/80">
          <span>12:00</span>
          <div className="flex items-center gap-2">
            <Signal className="h-4 w-4 sm:h-5 sm:w-5" />
            <Wifi className="h-4 w-4 sm:h-5 sm:w-5" />
            <Battery className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Notch */}
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-6 w-32 sm:w-40 rounded-full bg-black/90" />

        {/* Dotted bg */}
        <div className="absolute inset-0 top-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Content - using flex-1 to fill the space */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          {children}
        </div>

        {/* Bottom call buttons */}
        <div className="relative z-20 flex items-center justify-center gap-10 sm:gap-14 py-8">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onAccept}
              className="grid place-items-center h-14 w-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 active:bg-green-600 transform transition-transform duration-100 hover:scale-105 active:scale-95"
            >
              <PhoneCall className="h-6 w-6" />
            </button>
            <span className="text-xs text-gray-700">Accept</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onDecline}
              className="grid place-items-center h-14 w-14 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:bg-red-600 transform transition-transform duration-100 hover:scale-105 active:scale-95"
            >
              <PhoneOff className="h-6 w-6" />
            </button>
            <span className="text-xs text-gray-700">Ignore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
