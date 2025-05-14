import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check if dark theme is active
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };

    // Set initial theme state
    checkTheme();

    // Setup a mutation observer to detect theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

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
        target.closest('button') !== null ||
        target.classList.contains('interactive') ||
        (target.closest('.interactive') !== null);
      
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
      observer.disconnect();
    };
  }, [isVisible]);

  // Only render custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  // Determine cursor styles based on state and theme
  const getCursorStyle = () => {
    // Base style
    const baseStyle: React.CSSProperties = {
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.1s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease'
    };

    // Always use normal blend mode on hover or click to prevent transparency issues
    if (isHovering || isClicking) {
      return {
        ...baseStyle,
        mixBlendMode: 'normal' as const,
        background: isClicking 
          ? 'rgba(255, 255, 255, 0.9)' 
          : isDarkTheme 
            ? 'var(--primary)' 
            : 'var(--primary)'
      };
    }
    
    // Default state uses mix-blend-difference for cool effect
    return {
      ...baseStyle,
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