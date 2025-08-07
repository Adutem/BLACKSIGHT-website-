import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom when messages change, but only if user is near bottom
  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, shouldAutoScroll]);

  // Track scroll position to determine if we should auto-scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // If user is within 100px of the bottom, enable auto-scroll
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldAutoScroll(isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Enable auto-scroll when user sends a message
    setShouldAutoScroll(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate assistant typing delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate contextual response based on user input
      let responseText = "I'm here to help! How can I assist you?";
      
      if (inputValue.toLowerCase().includes('business')) {
        responseText = "I help businesses with automation and support.";
      } else if (inputValue.toLowerCase().includes('price') || inputValue.toLowerCase().includes('cost')) {
        responseText = "Chat: $40/month. Voice: $45/month.";
      } else if (inputValue.toLowerCase().includes('feature')) {
        responseText = "Key features: scheduling, support, analytics.";
      } else if (inputValue.toLowerCase().includes('demo')) {
        responseText = "I'll schedule a demo for you!";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1500); // Simulate thinking time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-2 sm:p-4">
        <div className="flex items-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-1 sm:mr-2 animate-pulse"></div>
          <h2 className="text-sm sm:text-lg font-semibold">NOVA AI</h2>
        </div>
        <p className="text-xs opacity-80 mt-1">Online • Typically replies instantly</p>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 sm:mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] sm:max-w-xs md:max-w-md rounded-2xl px-2 sm:px-4 py-2 sm:py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="text-xs sm:text-sm">{message.text}</div>
              <div
                className={`text-xxs sm:text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-2 sm:mb-4">
            <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-2 sm:px-4 py-2 sm:py-3">
              <div className="flex space-x-1">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 bg-white border-t">
        <div className="flex items-center">
          <button
            className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 focus:outline-none rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 sm:h-6 w-4 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border rounded-full py-1 sm:py-2 px-2 sm:px-4 mx-1 sm:mx-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 text-xs sm:text-sm"
            rows={1}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isTyping}
            className={`p-1 sm:p-2 rounded-full ${
              inputValue.trim() === '' || isTyping
                ? 'text-gray-400'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 sm:h-6 w-4 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;