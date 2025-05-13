import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error on new submission
    
    try {
      const response = await fetch('/api/send-email', { // Ganti dengan endpoint API Anda jika berbeda
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset submission state after showing success message
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        // Try to parse as JSON, but fallback to text if it fails
        let errorMessage = 'Failed to send message. Please try again.';
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            // If not JSON, try to get text. This might be an HTML error page.
            const errorText = await response.text();
            console.error('Server responded with non-JSON error. Status:', response.status, 'Response:', errorText);
            errorMessage = `Server error (${response.status}). Check console for details.`;
            // Optionally, show a snippet of the error if it's short
            // if (errorText && errorText.length < 200) { 
            //     errorMessage = `Server error: ${errorText.substring(0,100)}...`;
            // }
          }
        } catch (parseError) {
          console.error('Failed to parse error response. Status:', response.status, 'Error:', parseError);
          // If parsing fails even after checking content type, or if response.text() itself fails
          errorMessage = `Server error (${response.status}). Could not parse response.`;
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom" ref={ref}>
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">Get In Touch</p>
          <h2 className="heading-lg mb-4 text-gradient">Contact Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <h3 className="heading-sm mb-6 text-gray-800 dark:text-white">Let's Talk</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Have a project in mind or just want to say hello? Feel free to reach out to me. I'm always open to discussing new projects, creative ideas, and opportunities.
            </p>
            
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-dark-700 text-primary-500 dark:text-primary-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Email</h4>
                  <a href="mailto:hello@example.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  bangmulukkeren@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-dark-700 text-primary-500 dark:text-primary-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Sragen, Central Java, Indonesia</p>
                </div>
              </motion.div>
              
              <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-dark-700 text-primary-500 dark:text-primary-400">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Phone</h4>
                  <a href="tel:+11234567890" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  +62 815 4816 3365
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Rijal Keren"
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block mb-1 text-gray-700 dark:text-gray-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="example@example.com"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div className="mb-4" variants={itemVariants}>
                    <label htmlFor="subject" className="block mb-1 text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Project Inquiry"
                    />
                  </motion.div>
                  
                  <motion.div className="mb-6" variants={itemVariants}>
                    <label htmlFor="message" className="block mb-1 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Hello, I'm interested in working with you on a project..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={isSubmitting}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>Send Message</span>
                        <Send size={18} className="ml-2" />
                      </div>
                    )}
                  </motion.button>
                  {error && (
                    <motion.div 
                      className="mt-4 p-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/30 rounded-md text-sm text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </form>
              ) : (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-4 rounded-full bg-primary-500/10 dark:bg-primary-500/20 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Send size={24} className="text-primary-500 dark:text-primary-400" />
                  </div>
                  <h3 className="heading-sm mb-2 text-gray-800 dark:text-white">Message Sent!</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Thank you for your message. I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;