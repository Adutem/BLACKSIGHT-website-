import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {Header}  from "./components/Header";
import  HeroSection  from "./components/HeroSection";
import LeadForm from "./components/LeadForm";
import { JourneySteps } from "./components/JourneySteps";
import { JourneyStepCarousel } from "./components/JourneyStepCarousel";
import NodeBaseAutomation  from "./components/node-base-automation"; // Corrected import
import  AiAssistantSteps from "./components/ai-assistant-steps";
import AiVoiceHero from "./components/ai-voice-hero";
import { GetInTouch } from "./components/GetInTouch";
import Products from "./pages/Products";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Terms } from "./pages/Terms";
import FormDemo from "./pages/FormDemo";
import WhyNovaDemo from "./pages/why-nova-demo";
import  FaqDemo  from "./pages/carousel-demo"; // Importing the carousel demo
import JoinCommunitiesDemo from "./pages/join-communities-demo";
import { Footer } from "./components/Footer";
import PhoneFormMockupDeviceFramSet from "./components/PhoneMockUpFormDeviceFrameset";

const App: React.FC = () => {

  const phoneMockupSvgPath = "./assets/phonemockup.svg"; // Path to the phone mockup SVG

  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<>
                <HeroSection />
                <br />
                <section className="flex flex-col items-center justify-center min-h-screen bg-white pt-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 max-w-2xl text-gray-800">
        Your Next Business Breakthrough Could Be a Call Away — Meet Nova
      </h2>

      <div
  className="overflow-hidden w-full rounded-lg flex items-top justify-center"
  style={{height: "500px" }}
>
  <PhoneFormMockupDeviceFramSet />
</div>



    </section>
                <JourneySteps />
                <JourneyStepCarousel />
                <NodeBaseAutomation /> 
                <AiAssistantSteps />
                <AiVoiceHero />
                <WhyNovaDemo />
                <FaqDemo />
                <JoinCommunitiesDemo />

            
              </>} />
            <Route path="/products" element={<Products />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/get-in-touch" element={<GetInTouch />} />
            <Route path="/form-demo" element={<FormDemo />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;