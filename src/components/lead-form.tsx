'use client'; // This component needs to be a Client Component to use hooks like useState

import React, { useState } from 'react';

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

  const fields = [
    { label: "Email", name: "email", type: "email", required: true },
    { label: "First Name", name: "firstName", type: "text", required: true },
    { label: "Last Name", name: "lastName", type: "text", required: true },
    { label: "Company", name: "company", type: "text", required: false },
    { label: "Phone Number", name: "phone", type: "tel", required: true }
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg"> {/* Added background and shadow for the form itself */}
      <h3 className="text-blue-600 text-xl font-bold mb-6 text-center">Get A Live call From Nova AI</h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                className={`w-full border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                type={field.type}
                name={field.name}
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

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white rounded-lg py-3 font-bold hover:bg-blue-600 transition duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
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
      {/* Simple fade-in animation for success message */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LeadForm;
