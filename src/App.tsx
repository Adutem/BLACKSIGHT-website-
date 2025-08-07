import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LeadForm } from "./components/LeadForm";
import { JourneySteps } from "./components/JourneySteps";
import { JourneyStepCarousel } from "./components/JourneyStepCarousel";
import { GetInTouch } from "./components/GetInTouch";
import Products from "./pages/Products"; // Changed to default import
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import FormDemo from "./pages/FormDemo"; // Assuming this is a placeholder component
import { Footer } from "./components/Footer";

// Create placeholder pages

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
          <Route path="/terms" element={<Terms />} />
          <Route path="/get-in-touch" element={<GetInTouch />} />
          <Route path="/form-demo" element={<FormDemo />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;