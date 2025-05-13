import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code } from 'lucide-react';

import projectImage1 from '../assets/images/project/other1.png'; 
import projectImage2 from '../assets/images/project/other2.png'; 

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  github: string;
  demo: string;
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Simple Portofolio Website',
      description: 'A simple portfolio website showcasing projects and skills.',
  image: projectImage1,
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      category: 'other',
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      id: 2,
      title: 'Advance Portfolio Website',
      description: 'An advanced portfolio website with animations and interactive elements.',
  image: projectImage2,
      tags: ['Flask', 'HTML5', 'CSS3', 'JavaScript'],
      category: 'backend',
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A Kanban-style task management application with drag-and-drop functionality.',
      image: 'https://images.pexels.com/photos/1280730/pexels-photo-1280730.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'TypeScript', 'Firebase'],
      category: ['AI & ML', 'other'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    // {
    //   id: 4,
    //   title: 'Weather Dashboard',
    //   description: 'Real-time weather application with forecast data and interactive maps.',
    //   image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   tags: ['JavaScript', 'OpenWeatherAPI', 'Chart.js'],
    //   category: 'frontend',
    //   github: 'https://github.com',
    //   demo: 'https://example.com'
    // },
    // {
    //   id: 5,
    //   title: 'Social Media API',
    //   description: 'RESTful API for a social media platform with authentication and image uploading.',
    //   image: 'https://images.pexels.com/photos/7438103/pexels-photo-7438103.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    //   category: 'backend',
    //   github: 'https://github.com',
    //   demo: 'https://example.com'
    // },
    // {
    //   id: 6,
    //   title: 'Cryptocurrency Tracker',
    //   description: 'Live cryptocurrency price tracker with historical data charts and portfolio management.',
    //   image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   tags: ['React', 'Redux', 'CryptoAPI', 'Chart.js'],
    //   category: 'frontend',
    //   github: 'https://github.com',
    //   demo: 'https://example.com'
    // }
  ];

  // Filter projects based on category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-400 font-medium mb-2">My Recent Work</p>
          <h2 className="heading-lg mb-4 text-gradient">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', 'AI & ML', 'backend', 'other'].map(category => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  filter === category 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects.map(project => (
            <motion.div 
              key={project.id}
              className="card project-card overflow-hidden flex flex-col h-full"
              variants={itemVariants}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Project Links - appear on hover */}
                <div className="absolute inset-0 bg-dark-900/80 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <motion.a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-dark-700 text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-dark-700 text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="heading-sm mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-sm flex-1">{project.description}</p>
                
                {/* Project Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs font-medium rounded bg-dark-700 text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-dark-700 text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Project Links - visible at bottom */}
                <div className="mt-auto pt-4 border-t border-dark-700 flex justify-between">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center gap-1 text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <Code size={16} />
                    Source
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center gap-1 text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Show more button - could link to a dedicated projects page */}
        <div className="text-center mt-12">
          <motion.a 
            href="#" 
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;