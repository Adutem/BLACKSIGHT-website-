import React, { useState } from 'react';

export const LeadForm: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <section className="flex flex-col items-center py-12 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Your Next Business Breakthrough Could Be a Call Away — Meet Nova
      </h2>
      <div className="relative w-[350px] h-[700px] bg-gray-100 rounded-3xl shadow-lg flex flex-col justify-center items-center">
        <form className="w-full max-w-xs px-6 py-8" onSubmit={handleSubmit}>
          <h3 className="text-blue-600 text-lg font-bold mb-4">Get A Live call From Nova AI</h3>
          <input className="w-full border border-blue-400 rounded-md px-3 py-2 mb-3 focus:ring focus:ring-blue-200" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="w-full border border-blue-400 rounded-md px-3 py-2 mb-3 focus:ring focus:ring-blue-200" type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input className="w-full border border-blue-400 rounded-md px-3 py-2 mb-3 focus:ring focus:ring-blue-200" type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input className="w-full border border-blue-400 rounded-md px-3 py-2 mb-3 focus:ring focus:ring-blue-200" type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} />
          <input className="w-full border border-blue-400 rounded-md px-3 py-2 mb-3 focus:ring focus:ring-blue-200" type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold mt-4 hover:bg-blue-600 transition">Send IT</button>
        </form>
      </div>
    </section>
  );
};