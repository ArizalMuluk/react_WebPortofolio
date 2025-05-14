import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Only show cursor after first mouse movement
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over interactive elements
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;
      
      setIsHovering(isInteractive);
    };
    
    // Track mouse down events for click state
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    // Track mouse up events
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Show cursor when it enters the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', updateHoverState);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', updateHoverState);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Only render custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
        scale: isClicking ? 0.8 : isHovering ? 1.2 : 1
      }}
      transition={{
        type: "spring",
        mass: 0.3,
        stiffness: 800,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      style={{
        mixBlendMode: isClicking ? 'normal' : undefined
      }}
    />
  );
};

export default CustomCursor;