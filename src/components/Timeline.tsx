import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: 'work' | 'education' | 'award' | 'certification';
}

const Timeline = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const timelineEvents: TimelineEvent[] = [
    {
      date: "2025",
      title: "AI & ML Engineer",
      description: "Working on cutting-edge AI/ML projects and solutions.",
      icon: "work"
    },
    {
      date: "2024",
      title: "Python Developer",
      description: "Developing robust backend systems and data pipelines.",
      icon: "work"
    },
    {
      date: "2023",
      title: "Data Science Certification",
      description: "Completed advanced certification in Data Science and ML.",
      icon: "certification"
    },
    {
      date: "2022",
      title: "Bachelor's Degree",
      description: "Graduated with honors in Computer Science.",
      icon: "education"
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'work':
        return <Briefcase className="w-6 h-6" />;
      case 'education':
        return <GraduationCap className="w-6 h-6" />;
      case 'award':
        return <Award className="w-6 h-6" />;
      default:
        return <Calendar className="w-6 h-6" />;
    }
  };

  return (
    <section id="timeline" className="section-padding bg-white/70 dark:bg-neutral-900/70">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">My Journey</p>
          <h2 className="heading-lg mb-4 text-gradient">Professional Timeline</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between mb-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <motion.div
                  className="card hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                    {event.date}
                  </span>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                </motion.div>
              </div>

              <div className="relative flex items-center justify-center w-2/12">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {getIcon(event.icon)}
                </motion.div>
              </div>

              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;