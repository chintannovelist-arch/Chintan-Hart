
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';

// Simple fallback loader matching the site aesthetic
const SectionLoader = () => (
    <div className="flex items-center justify-center w-full min-h-[300px]">
        <div className="w-8 h-8 border-2 border-white/10 border-t-primary rounded-full animate-spin"></div>
    </div>
);

interface LazyLoadProps {
  children: React.ReactNode;
  delay?: number;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { 
          rootMargin: "200px", // Trigger slightly before element is in view to start loading chunk
          threshold: 0
      } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[100px] w-full relative">
      {isVisible ? (
        <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ 
                duration: 0.9, 
                ease: [0.22, 1, 0.36, 1], // Snappy cinematic ease matching ScrollReveal
                delay 
            }}
        >
          <Suspense fallback={<SectionLoader />}>
            {children}
          </Suspense>
        </motion.div>
      ) : (
          /* Placeholder height to prevent layout shift jumping before load */
          <div className="h-24 w-full" />
      )}
    </div>
  );
};

export default LazyLoad;
