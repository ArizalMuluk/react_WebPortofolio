import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, User, Briefcase, Code, Mail, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { name: 'Certificates', href: '#certificates', icon: <Award size={18} /> },
  { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTheme, setCurrentTheme] = useState('light'); // Default to light

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // If no saved theme, default to light
      document.documentElement.classList.remove('dark');
      setCurrentTheme('light');
      localStorage.setItem('theme', 'light');
    }

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
  }, []); // Empty dependency array means this runs once on mount

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 ${
        scrolled || isOpen // Tambahkan isOpen agar blur aktif saat menu mobile terbuka
          ? 'bg-white/80 dark:bg-dark-800/90 backdrop-blur-lg shadow-lg dark:shadow-black/20'
          : 'bg-transparent'
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20"> 
        {/* Logo */}
        <motion.a 
          href="#home" 
          className="text-2xl font-heading font-bold text-gradient" // text-gradient should work if primary/secondary colors are okay
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Arzlfrds
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1"> 
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300 group ${
                activeSection === item.href.substring(1)
                  ? 'text-primary-500 dark:text-primary-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span whileHover={{ y: -2 }}>{item.icon}</motion.span>
              <span>{item.name}</span>
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  layoutId="activeIndicator" // Untuk animasi antar item aktif
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>
          ))}
          
          <motion.button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center lg:hidden"> {/* Ubah md:hidden menjadi lg:hidden */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-16 md:top-20 bg-white/95 dark:bg-dark-800/98 backdrop-blur-xl" // Hapus pt-4 dari sini
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container-custom flex flex-col h-full pt-4"> {/* Pindahkan pt-4 ke sini */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-4 text-lg rounded-lg my-1 transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 font-medium'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700/50 hover:text-primary-500 dark:hover:text-primary-400'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                  <span>{item.name}</span>
                </motion.a>
              ))}
              <motion.div 
                className="mt-auto pb-8 text-center text-gray-500 dark:text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 + 0.2, duration: 0.5 }}
              >
                &copy; {new Date().getFullYear()} Arizal Firdaus
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;