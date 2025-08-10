import React from "react"
import { motion } from "framer-motion"
import ProductCardV2 from "../components/product-card-v2"
import ChatInterface from "../components/ChatInterface"
import ExampleVoicePhone from "../components/VoiceInterface"

export default function Products() {
  const chatFeatures = [
    "Smart Appointment Booking",
    "Tailored Product Suggestions",
    "Customer Support Automation",
    "Multi-language Support",
    "Data Analytics",
    "Seamless Integration",
    "24/7 Availability",
  ]

  const voiceFeatures = [
    "Live AI Voice Agent",
    "Custom Scripts & Memory",
    "Natural Conversation Flow",
    "Voice Recognition",
    "Call Analytics",
    "CRM Integration",
    "Multi-language Support",
  ]

  const SectionShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">{children}</section>
  )

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Page Heading */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14">
        <h1 className="text-center text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Your Next Business Breakthrough Could Be a Call Away — Meet Nova
        </h1>
      </div>

      <div className="mt-10 space-y-20 sm:space-y-28">
        {/* VOICE SECTION (Top: phone mockup + price card) */}
        <SectionShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-14">
            {/* Left: Phone with the Lead Form inside (matches screenshot) */}
           
           
           <ProductCardV2
                title="Nova Voice"
                features={voiceFeatures}
                price="$45 Monthly"
                onRequestAccess={() =>
                  alert("Request submitted for Nova Voice! Our team will contact you shortly.")
                }
              />
           
        
            {/* Right: Voice product card */}
            <div>
             <motion.div
              initial={{ opacity: 0, y: 24, rotateY: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
            >
                 <ExampleVoicePhone/>
              
            </motion.div>

            </div>
          </div>
        </SectionShell>

        {/* CHAT SECTION (Bottom: chat UI + price card) */}
        <SectionShell>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-14">
            {/* Left: Chat product card */}
            <div>
              <ProductCardV2
                title="Nova Chat Agent"
                features={chatFeatures}
                price="$40 Monthly"
                onRequestAccess={() =>
                  alert("Request submitted for Nova Chat Agent! Our team will contact you shortly.")
                }
              />
            </div>

            {/* Right: Chat Interface mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotateY: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[520px]">
                <ChatInterface
                  initialMessages={[
                    {
                      id: "1",
                      text: "Hello there! 😊 I'm Nova your personal assistant. How can I help you today?",
                      sender: "assistant",
                      timestamp: new Date(),
                    },
                    {
                      id: "2",
                      text: "I would like to make an inquiry about how you can help my business",
                      sender: "user",
                      timestamp: new Date(),
                    },
                  ]}
                />
              </div>
            </motion.div>
          </div>
        </SectionShell>
      </div>
    </div>
  )
}
