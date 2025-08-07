import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
  <header className="flex items-center justify-between py-2 sm:py-4 px-4 sm:px-8 bg-white shadow">
    <div className="flex items-center gap-1 sm:gap-2">
      <img src="/assets/blacksight-logo.svg" alt="Blacksight Logo" className="h-6 sm:h-8 w-auto" />
      <span className="font-bold text-lg sm:text-xl text-blue-700">Blacksight</span>
    </div>
    <nav className="hidden md:flex gap-3 sm:gap-6 text-gray-700 font-medium">
      <Link to="/" className="text-sm sm:text-base">Home</Link>
      <Link to="/products" className="text-sm sm:text-base">Products</Link>
      <Link to="/pricing" className="text-sm sm:text-base">Pricing</Link>
      <Link to="/about" className="text-sm sm:text-base">About Us</Link>
      <Link to="/contact" className="text-sm sm:text-base">Contact</Link>
    </nav>
    <div className="flex gap-1 sm:gap-2">
      <button className="bg-blue-600 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base">Sign In</button>
      <button className="bg-white text-blue-600 px-3 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md hover:bg-blue-50 transition text-sm sm:text-base">Sign Up</button>
    </div>
  </header>
);