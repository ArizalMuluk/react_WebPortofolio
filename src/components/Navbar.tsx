import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> },
  { name: 'About', href: '#about', icon: <User size={18} /> },
  { name: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
  { name: 'Skills', href: '#skills', icon: <Code size={18} /> },
  { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.pageYOffset + 80;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 ${
        scrolled 
          ? 'bg-dark-800/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <motion.a 
          href="#home" 
          className="text-2xl font-heading font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Arzlfrds
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 rounded-lg flex items-center space-x-1 transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? 'text-primary-400 font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.a>
          ))}
          
          <motion.button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-full bg-dark-700 text-gray-300 hover:text-white transition-all"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 mr-2 rounded-full bg-dark-700 text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-dark-700 text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom py-4 bg-dark-800/90 backdrop-blur-md border-t border-dark-700">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg my-1 ${
                activeSection === item.href.substring(1)
                  ? 'bg-dark-700 text-primary-400 font-medium'
                  : 'text-gray-300 hover:bg-dark-700/50'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;