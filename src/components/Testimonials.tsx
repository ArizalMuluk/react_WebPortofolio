import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Smith",
      role: "CTO",
      company: "Tech Innovations Inc.",
      content: "Arizal's expertise in AI and machine learning helped us implement cutting-edge solutions that significantly improved our data processing efficiency.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "DataTech Solutions",
      content: "Working with Arizal was a pleasure. His technical skills and ability to explain complex concepts made our project implementation smooth and successful.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Lead Developer",
      company: "AI Ventures",
      content: "The machine learning models developed by Arizal exceeded our expectations. His attention to detail and problem-solving skills are exceptional.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="section-padding bg-white/70 dark:bg-neutral-900/70">
      <div className="container-custom" ref={ref}>
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">What Others Say</p>
          <h2 className="heading-lg mb-4 text-gradient">Testimonials</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="card"
            >
              <div className="relative">
                <Quote
                  size={48}
                  className="absolute -top-6 -left-6 text-primary-500/20 dark:text-primary-400/20"
                />
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;