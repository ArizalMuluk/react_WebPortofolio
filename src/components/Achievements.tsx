import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Award, Users, Code, Coffee } from 'lucide-react';

interface Achievement {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  const achievements: Achievement[] = [
    {
      icon: <Award className="w-8 h-8" />,
      value: 15,
      label: "Awards Won",
      prefix: ""
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 50,
      label: "Happy Clients",
      prefix: ""
    },
    {
      icon: <Code className="w-8 h-8" />,
      value: 100000,
      label: "Lines of Code",
      prefix: ">"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      value: 500,
      label: "Cups of Coffee",
      prefix: ""
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10">
      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.2
                  }
                }
              }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {achievement.icon}
              </motion.div>
              
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {achievement.prefix}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {achievement.value.toLocaleString()}
                </motion.span>
                {achievement.suffix}
              </motion.h3>
              
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {achievement.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;