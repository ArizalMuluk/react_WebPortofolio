import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('interactive') ||
        target.closest('.interactive') !== null;
      
      setIsHovering(isInteractive);
      setIsOverInteractive(isInteractive);
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

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
      observer.disconnect();
    };
  }, [isVisible]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  const getCursorStyle = () => {
    const baseStyle: React.CSSProperties = {
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.1s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease'
    };

    if (isOverInteractive) {
      return {
        ...baseStyle,
        opacity: 0.5,
        mixBlendMode: 'normal' as const,
        background: isClicking 
          ? 'rgba(255, 255, 255, 0.3)' 
          : isDarkTheme 
            ? 'rgba(14, 165, 233, 0.3)' 
            : 'rgba(14, 165, 233, 0.3)'
      };
    }
    
    return {
      ...baseStyle,
      opacity: 1,
      mixBlendMode: 'difference' as const,
      background: 'white'
    };
  };

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
      style={getCursorStyle()}
    />
  );
};

export default CustomCursor;