import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LeadForm } from "./components/LeadForm";
import { JourneySteps } from "./components/JourneySteps";
import { JourneyStepCarousel } from "./components/JourneyStepCarousel";

import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";

// Create placeholder pages


const Products = () => (
  <>
    <Header />
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold">Our Products</h1>
    </main>
    <Footer />
  </>
);




const App: React.FC = () => (
  <Router>
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <LeadForm />
              <JourneySteps />
              <JourneyStepCarousel />
            
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
