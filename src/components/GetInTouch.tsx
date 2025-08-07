import React, { useState } from "react";

export const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, appointmentDate: selectedDate, appointmentTime: selectedTime });
    // Here you would typically send the data to your backend
    alert("Your appointment request has been submitted. We'll be in touch shortly!");
  };
  
  // Generate available dates (next 14 days)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        dates.push(formattedDate);
      }
    }
    return dates;
  };
  
  // Generate available time slots
  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`);
      if (hour !== endHour - 1) { // Don't add :30 for the last hour
        times.push(`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`);
      }
    }
    return times;
  };

  return (
    <section className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">Get in Touch</h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Schedule a consultation with our AI experts
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left side - Form */}
          <div className="md:w-1/2 p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    How can we help? (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us about your project or requirements"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 rounded-md transition-colors text-base sm:text-lg"
                >
                  Book Consultation
                </button>
              </div>
            </form>
          </div>
          
          {/* Right side - Calendar */}
          <div className="md:w-1/2 bg-gray-50 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Select a Date & Time</h3>
            
            {/* Date selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Dates</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {generateDates().map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-xs sm:text-sm p-2 border rounded-md ${
                      selectedDate === date
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time selection - only show if date is selected */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {generateTimeSlots().map((time, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`text-xs sm:text-sm p-2 border rounded-md ${
                        selectedTime === time
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selected appointment summary */}
            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-800">Your selected appointment:</h4>
                <p className="text-blue-700 mt-1 text-sm sm:text-base">
                  {selectedDate} at {selectedTime}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  30-minute consultation with our AI expert
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};