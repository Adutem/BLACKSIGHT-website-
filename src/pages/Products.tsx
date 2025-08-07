import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ChatInterface from '../components/ChatInterface';
import VoiceInterface from '../components/VoiceInterface';

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  const [isMounted, setIsMounted] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const chatFeatures = [
    "Smart Appointment Booking",
    "Tailored Product Suggestions",
    "Customer Support Automation",
    "Multi-language Support",
    "Data Analytics",
    "Seamless Integration",
    "24/7 Availability"
  ];
  
  const voiceFeatures = [
    "Live AI Voice Agent",
    "Custom Scripts & Memory",
    "Natural Conversation Flow",
    "Voice Recognition",
    "Call Analytics",
    "CRM Integration",
    "Multi-language Support"
  ];
  
  const handleRequestAccess = (product: string) => {
    alert(`Request submitted for ${product}! Our team will contact you shortly.`);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: 90,
      transformPerspective: 1000
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };
  
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  
  const tabButtonVariants = {
    rest: { scale: 1, backgroundColor: "#ffffff" },
    hover: { 
      scale: 1.03, 
      backgroundColor: "#f3f4f6",
      transition: { duration: 0.2 }
    },
    active: {
      backgroundColor: "#eff6ff",
      scale: 1.02
    }
  };

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden py-6 sm:py-12 px-2 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(45deg, #e0f2fe, #dbeafe, #ede9fe, #fce7f3)",
          backgroundSize: "400% 400%",
          y: backgroundY
        }}
      />
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-blue-200 opacity-40 z-0"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "0.5s" }}
      />
      <motion.div 
        className="absolute bottom-20 sm:bottom-40 right-5 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-purple-200 opacity-40 z-0"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 sm:left-1/3 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-indigo-200 opacity-40 z-0"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-8 sm:mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 sm:text-5xl mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nova AI Products
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transform your business with our intelligent AI solutions
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 mb-8 sm:mb-20"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            >
              <ProductCard
                title="Nova Chat Agent"
                subtitle="Build with us now!"
                price="$40 Monthly"
                features={chatFeatures}
                onRequestAccess={() => handleRequestAccess("Nova Chat Agent")}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0.5s" }}
            >
              <ProductCard
                title="Nova Voice"
                subtitle="Build with us now!"
                price="$45 Monthly"
                features={voiceFeatures}
                onRequestAccess={() => handleRequestAccess("Nova Voice")}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-xl overflow-hidden mb-8 sm:mb-16 border border-gray-100"
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Try Our AI Assistant</h2>
            <p className="text-gray-600 text-sm sm:text-base">Experience Nova AI in real-time</p>
          </div>
          
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/4 border-r-0 sm:border-r border-gray-200">
              <div className="flex flex-col">
                <motion.button
                  onClick={() => setActiveTab('chat')}
                  className={`py-2 sm:py-4 px-4 text-left font-medium text-sm sm:text-base ${
                    activeTab === 'chat'
                      ? 'text-blue-600 bg-blue-50 border-l-2 sm:border-l-4 border-blue-600'
                      : 'text-gray-600'
                  }`}
                  variants={tabButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={activeTab === 'chat' ? "active" : "rest"}
                >
                  Nova Chat Agent
                </motion.button>
                
                <motion.button
                  onClick={() => setActiveTab('voice')}
                  className={`py-2 sm:py-4 px-4 text-left font-medium text-sm sm:text-base ${
                    activeTab === 'voice'
                      ? 'text-blue-600 bg-blue-50 border-l-2 sm:border-l-4 border-blue-600'
                      : 'text-gray-600'
                  }`}
                  variants={tabButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={activeTab === 'voice' ? "active" : "rest"}
                >
                  Nova Voice
                </motion.button>
              </div>
            </div>
            
            <div className="w-full sm:w-3/4 p-4 sm:p-6 min-h-[300px] sm:min-h-[500px] flex items-center justify-center">
              {activeTab === 'chat' ? (
                <div className="w-full">
                  <ChatInterface 
                    initialMessages={[
                      {
                        id: '1',
                        text: "Hello there! 😊 I'm Nova your personal assistant. How can I help you today?",
                        sender: 'assistant',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        text: "I would like to make an inquiry about how you can help my business",
                        sender: 'user',
                        timestamp: new Date(),
                      }
                    ]}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <VoiceInterface />
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center text-gray-600 text-sm sm:text-base"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p></p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Products;