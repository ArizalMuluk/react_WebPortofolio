import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award, FileText, Download } from 'lucide-react';

import certificateImage1 from '../assets/images/certificate/certificate1.png';
import certificateImage2 from '../assets/images/certificate/certificate2.png';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  link: string;
  type: 'certificate' | 'publication';
  embedHtml?: string;
}

const items: Certificate[] = [
  {
    id: 1,
    title: "Build Real World AI Applications with Gemini and Imagen",
    issuer: "Google Cloud",
    date: "2025",
    image: certificateImage1,
    link: "https://www.credly.com/badges/de313a04-74e6-4e59-96aa-d1cdf13a44de/",
    type: "certificate"
  },
  {
    id: 2,
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    date: "2025",
    image: certificateImage2, 
    link: "https://www.credly.com/badges/8232faf3-f329-47e4-a46b-d98705d9c731/",
    type: "certificate",
  },
];

const Certificates = () => {
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const mainCertificatesCount = 2;
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    const scriptId = 'credly-embed-script';
    const needsCredlyScript = items.some(item => item.embedHtml && item.embedHtml.includes('credly.com'));

    if (needsCredlyScript && !document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//cdn.credly.com/assets/utilities/embed.js';
      document.body.appendChild(script);
    }
  }, []);

  const displayedCertificates = showAllCertificates ? items : items.slice(0, mainCertificatesCount);
  const hasMoreCertificates = items.length > mainCertificatesCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: [0, 1, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="certificates" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">Achievements & Research</p>
          <h2 className="heading-lg mb-4 text-gradient">Certificates & Publications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {displayedCertificates.map((item) => (
              <motion.div
                layout
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative rounded-xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full"
              >
                {/* Glow Effect */}
                <motion.div
                  variants={glowVariants}
                  initial="initial"
                  animate={hoveredId === item.id ? "hover" : "initial"}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl"
                />

                {/* Visual Container */}
                <div className="relative bg-gray-100 dark:bg-dark-900 flex justify-center items-center min-h-[220px] md:min-h-[270px] p-4 rounded-t-xl overflow-hidden">
                  {item.embedHtml ? (
                    <div
                      className="credly-embed-container w-full flex justify-center items-center"
                      dangerouslySetInnerHTML={{ __html: item.embedHtml }}
                    />
                  ) : item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      variants={imageVariants}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  ) : (
                    <motion.div
                      className="w-full h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.type === 'certificate' ? <Award size={48} /> : <FileText size={48} />}
                      <span className="mt-2 text-sm">No preview available</span>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.type === 'certificate' ? (
                        <Award className="text-primary-500 dark:text-primary-400" size={18} />
                      ) : (
                        <FileText className="text-primary-500 dark:text-primary-400" size={18} />
                      )}
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                        {item.type}
                      </span>
                    </motion.div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <motion.h3
                    className="text-lg md:text-xl font-semibold mb-1 text-gray-800 dark:text-white"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{item.issuer}</p>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-dark-700 flex items-center justify-start gap-4">
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Details"
                      className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      <span>Details</span>
                    </motion.a>
                    {item.image && item.type === 'certificate' && !item.embedHtml && (
                      <motion.a
                        href={item.image}
                        download={`${item.title.replace(/\s+/g, '_')}_Certificate.png`}
                        title="Download Certificate Image"
                        className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All/Show Less Button */}
        {hasMoreCertificates && (
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setShowAllCertificates(prev => !prev)}
              className="px-6 py-3 border border-primary-500 text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-500/10 dark:hover:bg-primary-400/10 transition-colors font-medium"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {showAllCertificates ? 'Show Less Achievements' : 'View All Achievements'}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;