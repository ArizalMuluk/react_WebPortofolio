import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Contoh penggunaan useEffect: Melakukan sesuatu setelah komponen di-mount
    if (animationContainerRef.current) {
      console.log('BackgroundAnimation component mounted. Container ref:', animationContainerRef.current);
    }

    // Contoh cleanup function (tidak terlalu dibutuhkan di sini, tapi sebagai contoh)
    return () => {
      console.log('BackgroundAnimation component will unmount.');
    };
  }, []); // Dependency array kosong berarti efek ini hanya berjalan sekali setelah mount dan cleanup sekali sebelum unmount

  return (
    <div ref={animationContainerRef} className="fixed inset-0 z-[-2] overflow-hidden">
      {/* Animated background gradient */}
      <div className="bg-animation hidden dark:block" /> {/* Assuming .bg-animation is for dark theme, hide on light */}
      {/* Add a light theme specific animation or a simpler static background if needed */}
      {/* <div className="light-bg-animation block dark:hidden" /> */}
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gray-700 dark:bg-white opacity-20" // Dark particles for light, light for dark
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          />
        ))}
      </div>
      
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(209,213,219,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(209,213,219,0.5)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(31,41,55,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(31,41,55,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />
      {/* Light grid: rgba(209,213,219,0.5) is gray-300. Dark grid: rgba(31,41,55,0.5) is gray-800 */}
    </div>
  );
};

export default BackgroundAnimation;