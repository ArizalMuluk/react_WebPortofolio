import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award, FileText, Download } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  type: 'certificate' | 'publication';
}

const items: Certificate[] = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    issuer: "Coursera - Stanford University",
    date: "2023",
    image: "https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg",
    link: "#",
    type: "certificate"
  },
  {
    id: 2,
    title: "Deep Learning Professional Certificate",
    issuer: "DeepLearning.AI",
    date: "2023",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    link: "#",
    type: "certificate"
  },
  {
    id: 3,
    title: "Implementation of AI in Healthcare",
    issuer: "International Journal of AI Research",
    date: "2023",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
    link: "#",
    type: "publication"
  },
  {
    id: 4,
    title: "Machine Learning in Financial Markets",
    issuer: "Journal of Data Science",
    date: "2023",
    image: "https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg",
    link: "#",
    type: "publication"
  }
];

const Certificates = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="certificates" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">Achievements & Research</p>
          <h2 className="heading-lg mb-4 text-gradient">Certificates & Publications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-sm">{item.date}</span>
                  <div className="flex gap-2">
                    <motion.a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                    <motion.button
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'certificate' ? (
                    <Award className="text-primary-500 dark:text-primary-400" size={20} />
                  ) : (
                    <FileText className="text-primary-500 dark:text-primary-400" size={20} />
                  )}
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {item.type === 'certificate' ? 'Certificate' : 'Publication'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.issuer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;