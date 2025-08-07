import React from "react";
import { FaPhone } from "react-icons/fa";

export const ContactForm: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">Let's Discuss Your AI Needs!</h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Have questions about AI automation?<br className="hidden sm:inline" />
          Contact us for support, business inquiries, or partnerships.
        </p>
      </div>
      
      {/* Contact Form Card */}
      <div className="bg-blue-50 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">Talk to Support</h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Looking for personalized AI solutions? Schedule a call with our AI 
            experts to explore tailored AI automation for your business.
          </p>
        </div>
        
        <form className="space-y-4 sm:space-y-6">
          {/* First Name */}
          <div className="bg-white p-3 sm:p-4 rounded-md shadow-inner">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Last Name */}
          <div className="bg-white p-3 sm:p-4 rounded-md shadow-inner">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Phone Number */}
          <div className="bg-white p-3 sm:p-4 rounded-md shadow-inner">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto">
                <select 
                  className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-md pl-8 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="US"
                >
                  <option value="US">🇺🇸 +1</option>
                  <option value="NG">🇳🇬 +234</option>
                  <option value="GB">🇬🇧 +44</option>
                  <option value="IN">🇮🇳 +91</option>
                  <option value="CA">🇨🇦 +1</option>
                  <option value="AU">🇦🇺 +61</option>
                  <option value="DE">🇩🇪 +49</option>
                  <option value="FR">🇫🇷 +33</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="bg-white p-3 sm:p-4 rounded-md shadow-inner">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Message */}
          <div className="bg-white p-3 sm:p-4 rounded-md shadow-inner">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Send us a message
            </label>
            <textarea
              id="message"
              placeholder="Message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 rounded-md transition-colors text-base sm:text-lg font-medium"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};