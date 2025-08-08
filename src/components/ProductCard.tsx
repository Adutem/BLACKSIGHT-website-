import React from 'react';
import { motion } from 'framer-motion';

// Main App component to showcase the responsive cards
const App = () => {
  const handleRequestAccess = () => {
    // Placeholder function for button click
    console.log("Request Access clicked!");
    alert("Request for access submitted!");
  };

  const productData = [
    {
      title: "Starter",
      subtitle: "The perfect plan to get you started",
      price: "$29/month",
      features: [
        "10 Projects",
        "50GB storage",
        "Community support",
        "Basic analytics"
      ]
    },
    {
      title: "Professional",
      subtitle: "For growing teams and businesses",
      price: "$99/month",
      features: [
        "Unlimited Projects",
        "500GB storage",
        "Dedicated support",
        "Advanced analytics"
      ]
    },
    {
      title: "Enterprise",
      subtitle: "Tailored for large organizations",
      price: "Contact Us",
      features: [
        "Custom pricing",
        "Dedicated infrastructure",
        "24/7 premium support",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12 font-sans">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
          Flexible Pricing for Everyone
        </h1>
        <p className="mt-2 text-md sm:text-lg text-gray-600">
          Choose a plan that fits your needs perfectly.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {productData.map((product, index) => (
          <ProductCard key={index} {...product} onRequestAccess={handleRequestAccess} />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  onRequestAccess: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  subtitle, 
  price, 
  features, 
  onRequestAccess 
}) => {
  // Animation variants for the card container
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for the inner items (text, list, etc.)
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Animation variants for the button
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col h-full w-full max-w-lg mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div className="mb-4" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
        <motion.p 
          className="text-blue-600 font-medium mt-1 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
      
      <motion.div className="mb-6 flex-grow" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Features</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              variants={itemVariants}
            >
              <motion.svg 
                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </motion.svg>
              <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        className="mt-auto"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.span 
            className="text-2xl sm:text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {price}
          </motion.span>
          <motion.button 
            onClick={onRequestAccess}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 w-full sm:w-auto"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            Request Access
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
