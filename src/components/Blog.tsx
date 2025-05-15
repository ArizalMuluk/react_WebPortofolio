import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

const Blog = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Machine Learning in Python",
      excerpt: "A comprehensive guide to beginning your journey in machine learning using Python...",
      date: "Mar 15, 2024",
      readTime: "8 min read",
      tags: ["Machine Learning", "Python", "Tutorial"],
      image: "https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg"
    },
    {
      id: 2,
      title: "Building Scalable Flask Applications",
      excerpt: "Learn how to create production-ready Flask applications with best practices...",
      date: "Mar 10, 2024",
      readTime: "10 min read",
      tags: ["Flask", "Python", "Backend"],
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"
    },
    {
      id: 3,
      title: "Deep Learning: A Practical Approach",
      excerpt: "Dive deep into neural networks and practical applications of deep learning...",
      date: "Mar 5, 2024",
      readTime: "12 min read",
      tags: ["Deep Learning", "AI", "Neural Networks"],
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg"
    }
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="blog" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">My Thoughts</p>
          <h2 className="heading-lg mb-4 text-gradient">Latest Blog Posts</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="card group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center text-white text-sm">
                  <Calendar size={16} className="mr-2" />
                  {post.date}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={16} className="mr-2" />
                  {post.readTime}
                </div>
                <motion.button
                  className="text-primary-500 dark:text-primary-400 flex items-center gap-1 group"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;