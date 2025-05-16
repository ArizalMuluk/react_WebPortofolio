import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code, X, AlertTriangle } from 'lucide-react';

import projectImage1 from '../assets/images/project/other1.png'; 
import projectImage2 from '../assets/images/project/other2.png'; 
import projectImage3 from '../assets/images/project/aiml.png';
import projectImage4 from '../assets/images/project/aiml2.png';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string | string[];
  github: string;
  demo: string;
}

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
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
      github: 'https://github.com/ArizalMuluk/smpl-portofolio-web',
      demo: 'https://simple-portofolio-web.vercel.app/'
    },
    {
      id: 2,
      title: 'Advance Portfolio Website',
      description: 'An advanced portfolio website with animations and interactive elements.',
      image: projectImage2,
      tags: ['Flask', 'HTML5', 'CSS3', 'JavaScript'],
      category: ['backend', 'other'],
      github: 'https://github.com/ArizalMuluk/adv-portofolio-web',
      demo: 'https://adv-portofolio-web.vercel.app/'
    },
    {
      id: 3,
      title: 'Iris Prediction System',
      description: 'A machine learning model to predict iris species based on flower measurements.',
      image: projectImage3,
      tags: ['Flask', 'Scikit-learn', 'Pandas', 'Numpy', 'HTML5', 'CSS3', 'Javascript'],
      category: ['AI & ML', 'backend'],
      github: 'https://github.com/ArizalMuluk/DT-model-testing',
      demo: ''
    },
    {
      id: 4,
      title: 'ChatBot Learning Assistant',
      description: 'A chatbot that assists users in learning new topics using AI.',
      image: projectImage4,
      tags: ['Flask', 'HTML5', 'Groq API', 'CSS3'],
      category: ['backend', 'AI & ML'],
      github: 'https://github.com/ArizalMuluk/learning-chatbot',
      demo: ''
    },
  ];

  // Tentukan berapa banyak proyek yang ditampilkan secara default.
  // Jika Anda memiliki 4 proyek dan grid 3 kolom, 3 adalah pilihan yang baik.
  const mainProjectsCount = 3; 

  // Filter projects based on category
  const projectsToDisplayFilteredByCategory = filter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (Array.isArray(project.category)) {
          return project.category.includes(filter);
        }
        return project.category === filter;
      });

  // Tentukan proyek yang akan ditampilkan berdasarkan state showAllProjects
  const displayedProjects = showAllProjects 
    ? projectsToDisplayFilteredByCategory
    : projectsToDisplayFilteredByCategory.slice(0, mainProjectsCount);

  // Cek apakah ada lebih banyak proyek untuk ditampilkan (setelah filter)
  const hasMoreProjects = projectsToDisplayFilteredByCategory.length > mainProjectsCount;

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

  const handleDemoClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, 
    projectTitle: string,
    projectDemoUrl: string
  ) => {
    e.preventDefault();
    // Cek apakah demo URL valid atau placeholder/kosong
    const isDemoUnavailable = !projectDemoUrl || projectDemoUrl.trim() === '' || projectDemoUrl === 'https://example.com';

    if (isDemoUnavailable) {
      setCurrentProject(projectTitle);
      setShowDemoPopup(true);
      
      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setShowDemoPopup(false);
      }, 3000);
    } else {
      window.open(projectDemoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleShowAllProjects = () => {
    setShowAllProjects(prev => !prev);
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">My Recent Work</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {['all', 'AI & ML', 'backend', 'other'].map(category => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                // Optional: Reset to show only main projects when filter changes
                // onClick={() => { setFilter(category); setShowAllProjects(false); }}
                  filter === category 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-600'
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
          {displayedProjects.map(project => (
            <motion.div 
              key={project.id}
              className="card rounded-lg overflow-hidden flex flex-col h-full" // Use card class
              variants={itemVariants}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-lg mb-4 h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Project Links - appear on hover */}
                <div className="absolute inset-0 bg-black/70 dark:bg-dark-900/80 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <motion.a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-gray-100/80 dark:bg-dark-700 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.button 
                    onClick={(e) => handleDemoClick(e, project.title, project.demo)}
                    className="p-2 rounded-full bg-gray-100/80 dark:bg-dark-700 text-primary-500 dark:text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-1">{project.description}</p>
                
                {/* Project Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs font-medium rounded bg-gray-200 dark:bg-dark-700 text-primary-600 dark:text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-200 dark:bg-dark-700 text-gray-500 dark:text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Project Links - visible at bottom */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-dark-700 flex justify-between">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    <Code size={16} />
                    Source
                  </a>
                  <button 
                    onClick={(e) => handleDemoClick(e, project.title, project.demo)}
                    className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tombol "View All Projects" / "Show Less" */}
        {/* Hanya tampilkan tombol jika ada proyek yang disembunyikan setelah filter */}
        {hasMoreProjects && (
          <div className="text-center mt-12">
            <motion.button 
              onClick={toggleShowAllProjects}
              className="px-6 py-3 border border-primary-500 text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? 'Show Less Projects' : 'View All Projects'}
            </motion.button>
          </div>
        )}
      </div>

      {/* Demo Not Available Popup */}
      <AnimatePresence>
        {showDemoPopup && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
          >
            <div className="bg-white dark:bg-dark-700 border border-gray-200 dark:border-primary-500/30 text-gray-800 dark:text-white rounded-lg shadow-lg p-4 flex items-start gap-3 max-w-sm">
              <div className="p-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-amber-500 dark:text-amber-400 flex-shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium mb-1">Demo Not Available</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {currentProject === "all projects" 
                    ? "The page for other projects is currently unavailable!" 
                    : `The demo site for "${currentProject}" is currently unavailable!`}
                </p>
              </div>
              <button 
                onClick={() => setShowDemoPopup(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;