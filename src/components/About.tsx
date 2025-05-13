import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Download, Award, Calendar, Coffee, X } from "lucide-react";
import myProfileImage from "../assets/images/profile.png";

const About = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 25 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.2 } 
    }
  };

  const stats = [
    { icon: <Calendar size={24} />, count: "3+", label: "Years Experience" },
    { icon: <Award size={24} />, count: "20+", label: "Projects Completed" },
    { icon: <Coffee size={24} />, count: "50+", label: "Coffee Cups" },
  ];

  const handleCVDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPopup(true);
    // Auto-close popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-800/50 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">Get To Know</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About image */}
          <motion.div
            className="relative"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-2xl transform -rotate-6"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-secondary-500/10 to-accent-500/10 dark:from-secondary-500/20 dark:to-accent-500/20 rounded-2xl transform rotate-3"></div>

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden border-4 border-gray-200 dark:border-dark-700">
                <img
                  src={myProfileImage}
                  alt="Arizal Firdaus - Profile"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* About content */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInVariants}
            className="flex flex-col space-y-6"
          >
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-gray-100 dark:bg-dark-700 rounded-lg shadow-lg flex flex-col items-center text-center py-4"
                  custom={index}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={statsVariants}
                >
                  <div className="text-primary-500 dark:text-primary-400 mb-2">{stat.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.count}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* About text */}
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                I'm a dedicated Python professional enthusiastic about ML/AI. I specialize in applying Python development, data insights, and Flask to engineer efficient, intelligent solutions designed for complex challenges and smooth user interaction online.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                My programming journey began 3 years ago, focusing primarily on Python. My enthusiasm quickly grew towards Machine Learning/AI and Flask backend development, areas I've been actively exploring and deepening my skills in for approximately the last year.
              </p>

              {/* CTA Button */}
              <motion.button
                onClick={handleCVDownload}
                className="btn-primary px-6 py-3 inline-flex items-center gap-2" // Use btn-primary and add specifics
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Download CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notification Popup */}
      {showPopup && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
        >
          <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-primary-500/30 text-gray-800 dark:text-white rounded-lg shadow-lg p-4 flex items-start gap-3 max-w-sm">
            <div className="p-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-500 dark:text-primary-400 flex-shrink-0">
              <Download size={20} />
            </div>
            <div className="flex-grow">
              <h4 className="font-medium mb-1">CV Not Available</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">The CV is currently not available for download. Please check back later.</p>
            </div>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default About;