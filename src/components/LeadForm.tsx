import React, { useState, useEffect, useRef } from 'react';

export const LeadForm: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add subtle floating animation to phone only
    const interval = setInterval(() => {
      if (phoneRef.current) {
        phoneRef.current.style.transform = `translateY(${Math.sin(Date.now() / 2000) * 6}px)`;
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', form);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setForm({
          email: '',
          firstName: '',
          lastName: '',
          company: '',
          phone: '',
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 max-w-2xl text-gray-800 z-10">
        Your Next Business Breakthrough Could Be a Call Away — Meet Nova
      </h2>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
        
        {/* Glowing ring around phone area */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[700px] rounded-full border-2 border-blue-300 opacity-20 animate-pulse-slow pointer-events-none"></div>
      </div>
      
      {/* iPhone 16 Mockup with animation */}
      <div 
        ref={phoneRef}
        className="relative w-[320px] sm:w-[340px] h-[680px] z-10"
      >
        {/* Phone frame with realistic details */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black rounded-[40px] p-4 shadow-2xl">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-10 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
          </div>
          
          {/* Camera cutout */}
          <div className="absolute top-8 right-6 w-8 h-8 bg-black rounded-full flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 bg-gray-900 rounded-full border border-gray-700"></div>
          </div>
          
          {/* Speaker grille */}
          <div className="absolute top-8 left-6 w-16 h-1 bg-gray-900 rounded-full"></div>
          
          {/* Phone screen with glass effect */}
          <div className="relative h-full bg-gradient-to-b from-gray-100 to-white rounded-[32px] overflow-hidden flex flex-col shadow-inner">
            {/* Status bar */}
            <div className="h-8 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 text-xs">
              <span>9:41</span>
              <div className="flex space-x-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>
            
            {/* Form content - No animations that interfere with input */}
            <div className="flex-1 px-6 py-4 flex flex-col">
              <h3 className="text-blue-600 text-xl font-bold mb-6 text-center">Get A Live call From Nova AI</h3>
              
              <form className="flex-1 flex flex-col" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {[
                    { type: "email", name: "email", placeholder: "Email", required: true },
                    { type: "text", name: "firstName", placeholder: "First Name", required: true },
                    { type: "text", name: "lastName", placeholder: "Last Name", required: true },
                    { type: "text", name: "company", placeholder: "Company", required: false },
                    { type: "tel", name: "phone", placeholder: "Phone Number", required: true }
                  ].map((field) => (
                    <div key={field.name}>
                      <input 
                        className={`w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        type={field.type} 
                        name={field.name} 
                        placeholder={field.placeholder} 
                        value={form[field.name as keyof typeof form]} 
                        onChange={handleChange} 
                        required={field.required}
                      />
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg py-4 font-bold hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send IT"
                    )}
                  </button>
                  
                  {isSubmitted && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center animate-fade-in">
                      <p>✓ Form submitted successfully!</p>
                      <p className="text-xs mt-1">We'll contact you soon</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Side buttons */}
          <div className="absolute left-0 top-24 w-1 h-16 bg-gray-700 rounded-l-lg"></div>
          <div className="absolute left-0 top-44 w-1 h-10 bg-gray-700 rounded-l-lg"></div>
          <div className="absolute right-0 top-32 w-1 h-24 bg-gray-700 rounded-r-lg"></div>
        </div>
        
        {/* Phone shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[280px] h-8 bg-black bg-opacity-60 rounded-full blur-md"></div>
        
        {/* Animated glow around phone */}
        <div className="absolute inset-0 rounded-[40px] bg-blue-500 opacity-0 blur-xl animate-pulse-slow pointer-events-none"></div>
      </div>
      
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle linear infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};