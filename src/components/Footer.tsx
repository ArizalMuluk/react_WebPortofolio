import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-dark-800 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About column */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-heading font-bold text-gradient mb-4">John Doe</h3>
            <p className="text-gray-300 mb-4">
              A passionate Frontend Web Developer building modern and responsive websites and web applications.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block text-sm">Email:</span>
                <a href="mailto:hello@example.com" className="hover:text-primary-400 transition-colors">
                  hello@example.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm">Phone:</span>
                <a href="tel:+11234567890" className="hover:text-primary-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm">Location:</span>
                <span>San Francisco, CA, USA</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-dark-700 mb-8"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center sm:text-left mb-4 sm:mb-0">
            © {new Date().getFullYear()} John Doe. All rights reserved. Made with {' '}
            <Heart size={14} className="inline text-red-500" /> using React.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-dark-700 text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;