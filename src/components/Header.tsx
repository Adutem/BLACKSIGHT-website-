import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
  <header className="flex items-center justify-between py-4 px-8 bg-white shadow">
    <div className="flex items-center gap-2">
      <img src="/assets/blacksight-logo.svg" alt="Blacksight Logo" className="h-8 w-auto" />
      <span className="font-bold text-xl text-blue-700">Blacksight</span>
    </div>
    <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <div className="flex gap-2">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">Sign In</button>
      <button className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-blue-50 transition">Sign Up</button>
    </div>
  </header>
);