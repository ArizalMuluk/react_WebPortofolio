import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  minDisplayTime?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ minDisplayTime = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = performance.now();
    
    // Handle the window load event
    const handleLoad = () => {
      const elapsedTime = performance.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      // Ensure the loading screen displays for at least minDisplayTime
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // For already loaded page
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      // Fallback in case load event doesn't fire
      setTimeout(() => {
        setIsLoading(false);
      }, minDisplayTime);
      
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [minDisplayTime]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Loader animation */}
            <div className="loader mb-6"></div>
            
            {/* Loading text with typing effect */}
            <motion.div 
              className="text-2xl font-heading font-bold text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Loading Bosss
            </motion.div>
            
            {/* Animated dots */}
            <div className="flex space-x-2 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary-500"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;