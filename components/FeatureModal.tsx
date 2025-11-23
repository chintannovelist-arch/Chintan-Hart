
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FeatureModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ children, onClose, title }) => {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/90 backdrop-blur-xl overflow-y-auto custom-scrollbar flex items-start justify-center p-4 md:p-8"
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="relative w-full max-w-7xl bg-[#0F0F0F] rounded-lg shadow-2xl border border-white/10 overflow-hidden my-auto min-h-[50vh]"
            >
                {/* Header */}
                <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
                    <h3 className="font-display text-xl text-white tracking-wider">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 hover:text-primary rounded-full transition-colors group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform"/>
                    </button>
                </div>

                {/* Content Container - CSS overrides handle internal section padding */}
                <div className="feature-modal-content">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FeatureModal;
