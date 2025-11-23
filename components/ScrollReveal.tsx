
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.9, 
                ease: [0.22, 1, 0.36, 1], // Cinematic ease
                delay: delay
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
