import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const containerRef = useRef(null);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5
      }
    })
  };

  useEffect(() => {
    const container = containerRef.current;
    
    const handleWheel = (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        const scrollSpeed = 1.5;
        container.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 to-blue-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-yellow-400 text-transparent bg-clip-text">
            My Services
          </h1>
          <p className="text-gray-200 text-lg">
            Professional solutions tailored to your needs
          </p>
        </div>

        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none"
        >
          {Services_Data.map((service, index) => (
            <motion.div
              key={service.s_no}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer snap-center min-w-[300px] md:min-w-0"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariants}
            >
              <div className="text-4xl font-bold text-blue-400 mb-4">
                {service.s_no}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.s_name}
              </h3>
              <p className="text-gray-300">
                {service.s_desc}
              </p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full text-black font-medium hover:opacity-90 transition-opacity">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;