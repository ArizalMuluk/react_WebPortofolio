import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
  name: string;
  level: number;
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
    { name: 'Python', level: 95, category: 'ai-ml', icon: '🐍' },
    { name: 'TensorFlow', level: 90, category: 'ai-ml', icon: '🧠' },
    { name: 'PyTorch', level: 88, category: 'ai-ml', icon: '🔥' },
    { name: 'NumPy', level: 92, category: 'ai-ml', icon: '📊' },
    { name: 'Pandas', level: 90, category: 'ai-ml', icon: '🐼' },
    { name: 'Matplotlib', level: 85, category: 'ai-ml', icon: '📈' },
    
    // Backend
    { name: 'Flask', level: 88, category: 'backend', icon: '🌶️' },
    { name: 'Django', level: 85, category: 'backend', icon: '🎯' },
    { name: 'RESTful APIs', level: 85, category: 'backend', icon: '🔌' },
    { name: 'SQL', level: 80, category: 'backend', icon: '💾' },
    
    // Other Skills
    { name: 'Linux', level: 85, category: 'other', icon: '🐧' },
    { name: 'Bash', level: 82, category: 'other', icon: '💻' },
    { name: 'Git', level: 85, category: 'other', icon: '🔄' },
    { name: 'HTML/CSS', level: 75, category: 'other', icon: '🎨' },
    { name: 'JavaScript', level: 70, category: 'other', icon: '📜' },
    { name: 'Mathematical Logic', level: 90, category: 'other', icon: '🔢' },
  ];

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "easeOut" }
    })
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
                    className="mb-4"
                    variants={skillVariants}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="mr-2 text-xl">{skill.icon}</span>
                        <span className="font-medium text-gray-800 dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full"
                        custom={skill.level}
                        variants={progressVariants}
                      />
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