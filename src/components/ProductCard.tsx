import React from 'react';
import { motion } from 'framer-motion';

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
  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div className="mb-4" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <motion.p 
          className="text-blue-600 font-medium mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
      
      <motion.div className="mb-6" variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Features</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.svg 
                className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
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
              <span className="text-gray-600">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      <motion.div 
        className="mt-auto"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.span 
            className="text-xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {price}
          </motion.span>
          <motion.button 
            onClick={onRequestAccess}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            Request Access
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;