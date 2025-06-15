import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  category: 'ai-ml' | 'backend' | 'other';
  icon: string;
}

const Skills: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const skills: Skill[] = [
    // AI & ML
    // Ganti dengan path ke file SVG Anda, contoh: '/logos/python.svg'
    // Pastikan file SVG ada di folder public Anda (misalnya public/logos/python.svg)
    { name: 'Python', category: 'ai-ml', icon: '/logos/python.svg' },
    { name: 'TensorFlow', category: 'ai-ml', icon: '/logos/tensorflow.svg' },
    { name: 'PyTorch', category: 'ai-ml', icon: '/logos/pytorch.svg' },
    { name: 'NumPy', category: 'ai-ml', icon: '/logos/numpy.svg' },
    { name: 'Scikit-learn', category: 'ai-ml', icon: '/logos/scikit-learn.svg' },
    { name: 'Pandas', category: 'ai-ml', icon: '/logos/pandas.svg' },
    { name: 'Matplotlib', category: 'ai-ml', icon: '/logos/matplotlib.svg' },
    
    // Backend
    { name: 'Flask', category: 'backend', icon: '/logos/flask.svg' },
    { name: 'Django', category: 'backend', icon: '/logos/django.svg' },
    { name: 'Fast API', category: 'backend', icon: '/logos/fastapi.svg' }, // Anda mungkin perlu membuat ikon generik untuk ini
    { name: 'MySQL', category: 'backend', icon: '/logos/mysql.svg' }, // Atau ikon database spesifik
    
    // Other Skills
    { name: 'Linux', category: 'other', icon: '/logos/linux.svg' },
    { name: 'Bash', category: 'other', icon: '/logos/bash.svg' },
    { name: 'Git', category: 'other', icon: '/logos/git.svg' },
    { name: 'Ubuntu', category: 'other', icon: '/logos/ubuntu.svg' }, // Bisa juga dipisah HTML & CSS
    { name: 'Google Cloud Platform', category: 'other', icon: '/logos/googlecloud.svg' },
    { name: 'Docker', category: 'other', icon: '/logos/docker.svg' }, // Ikon generik
  ];
  // Catatan: Anda perlu membuat atau mendapatkan file SVG untuk setiap logo
  // dan menempatkannya di folder `public/logos/` (atau path yang Anda tentukan).
  // Nama file di atas adalah contoh.

  const skillsByCategory = {
    'ai-ml': skills.filter(skill => skill.category === 'ai-ml'),
    'backend': skills.filter(skill => skill.category === 'backend'),
    'other': skills.filter(skill => skill.category === 'other'),
  };

  const categoryTitles = {
    'ai-ml': 'AI & Machine Learning',
    'backend': 'Backend Development',
    'other': 'Other Skills'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="section-padding bg-white/70 dark:bg-neutral-900/70">
      <div className="container-custom" ref={ref}>
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">What I Can Do</p>
          <h2 className="heading-lg mb-4 text-gradient">My Skills</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <motion.div 
              key={category}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={containerVariants}
            >
              <h3 className="heading-sm mb-6 capitalize text-gradient">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                {categorySkills.map(skill => (
                  <motion.div 
                    key={skill.name}
                    className="mb-3 p-3 bg-gray-100 dark:bg-dark-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    variants={skillVariants}
                  >
                    <div className="flex items-center">
                      <img 
                        src={skill.icon} 
                        alt={`${skill.name} logo`} 
                        className="w-6 h-6 mr-3" // Sesuaikan ukuran jika perlu
                        onError={(e) => (e.currentTarget.style.display = 'none')} // Sembunyikan jika gambar gagal dimuat
                      />
                      <span className="font-medium text-gray-800 dark:text-white">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;