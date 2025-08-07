import React, { useState } from 'react';

const VoiceInterface: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [callStatus, setCallStatus] = useState<'connecting' | 'incoming'>('connecting');

  // Simulate connection process
  setTimeout(() => {
    if (isConnecting) {
      setIsConnecting(false);
      setCallStatus('incoming');
    }
  }, 3000);

  const handleAccept = () => {
    alert('Call accepted! This would connect to the Nova Voice Agent.');
  };

  const handleIgnore = () => {
    alert('Call ignored. Nova Voice Agent will try again later.');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-8 h-full">
      <div className="w-48 sm:w-64 h-48 sm:h-64 rounded-full sm:rounded-full bg-blue-900 flex items-center justify-center mb-4 sm:mb-8">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 sm:h-16 w-12 sm:w-16 text-blue-400 mx-auto mb-1 sm:mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <p className="text-white font-semibold text-sm sm:text-base">NOVA AI</p>
        </div>
      </div>
      
      <div className="text-center mb-4 sm:mb-8">
        {callStatus === 'connecting' ? (
          <div className="text-white">
            <p className="text-lg sm:text-xl mb-1 sm:mb-2">NOVA AI Connecting...</p>
            <div className="flex justify-center space-x-0.5 sm:space-x-1">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        ) : (
          <div className="text-white">
            <p className="text-lg sm:text-xl mb-1 sm:mb-2">Incoming Call</p>
            <p className="text-blue-300 text-sm sm:text-base">Nova Voice Agent</p>
          </div>
        )}
      </div>
      
      {callStatus === 'incoming' && (
        <div className="flex space-x-3 sm:space-x-6">
          <button 
            onClick={handleIgnore}
            className="w-12 sm:w-16 h-12 sm:h-16 rounded-full sm:rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button 
            onClick={handleAccept}
            className="w-12 sm:w-16 h-12 sm:h-16 rounded-full sm:rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 sm:h-8 w-6 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;