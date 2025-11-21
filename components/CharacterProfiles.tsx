

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Flower2 } from 'lucide-react';

// Animation variants for a more cinematic entrance
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4, delayChildren: 0.2 },
  },
};

const stormCardVariants = {
  hidden: { opacity: 0, x: -100, rotateY: 15 },
  visible: {
    opacity: 1, x: 0, rotateY: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const sparkCardVariants = {
  hidden: { opacity: 0, x: 100, rotateY: -15 },
  visible: {
    opacity: 1, x: 0, rotateY: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fixed and more effective ShimmeringText component
const ShimmeringText = ({ children }: { children: React.ReactNode }) => (
    <span className="relative inline-block">
        {children}
        {/* FIX: The self-closing span tag was causing a parser issue, leading to a false "children is missing" error on this component. Using an explicit closing tag resolves this. */}
        <span
            className="absolute -inset-1 block animate-shimmer bg-repeat opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                backgroundImage: `linear-gradient(-60deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%)`,
                backgroundSize: '200% 100%',
            }}
            aria-hidden="true"
        ></span>
    </span>
);


const CharacterProfiles: React.FC = () => (
  <motion.section
    id="protagonists"
    className="py-32 bg-black relative overflow-hidden"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariants}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,150,190,0.04),transparent_50%)] pointer-events-none"></div>

    <div className="max-w-6xl mx-auto px-6 text-center">
      <motion.h2
        className="font-display text-4xl md:text-6xl text-white mb-20 tracking-wider [text-shadow:0_0_20px_rgba(255,255,255,0.2)]"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1 }}}}
      >
        The Storm & The Spark
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-stretch perspective-1000">
        {/* VIJAY - THE STORM */}
        <motion.div
          variants={stormCardVariants}
          className="relative flex flex-col p-8 md:p-10 border border-white/10 rounded-lg bg-black/50 backdrop-blur-xl shadow-glass overflow-hidden"
        >
          {/* Animated Background - Digital Storm */}
          <motion.div
            className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]"
            style={{ backgroundSize: '200px 200px' }}
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_60%)] bg-gradient-to-br from-primary/10 to-transparent"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-5xl text-slate-200 tracking-[0.2em]">VIJAY</h3>
              <p className="text-primary text-sm font-bold uppercase tracking-[0.3em]">The Architect of Order</p>
              <p className="font-body text-slate-400 text-lg leading-relaxed max-w-sm mx-auto">
                He is a fortress of discipline in a tailored suit, a man whose silence is a loaded weapon. He built a wall to keep his distance, believing control was a choice. He was wrong.
              </p>
            </div>

            <div className="space-y-8 mt-12">
              <div className="relative group cursor-pointer w-fit mx-auto">
                  <blockquote className="font-display text-xl text-slate-300 italic transition-all px-8 text-center group-hover:text-white">
                      {/* FIX: Correctly nested the text inside the ShimmeringText component to provide the required 'children' prop. */}
                      <ShimmeringText>
                        "A gentleman on the outside. A wildfire underneath."
                      </ShimmeringText>
                  </blockquote>
                  <Zap size={18} className="absolute top-1/2 -right-0 -translate-y-1/2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-safe:animate-pulse" aria-hidden="true" />
              </div>
              <div className="pt-6 border-t border-white/10">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Character Arc</h4>
                  <p className="text-sm text-slate-500 italic max-w-sm mx-auto">
                      From iron-clad suppression to a raw, passionate surrender. He starts as a guardian of rules, only to become the one who breaks every single one for her.
                  </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MEENA - THE SPARK */}
        <motion.div
          variants={sparkCardVariants}
          className="relative flex flex-col p-8 md:p-10 border border-white/10 rounded-lg bg-black/50 backdrop-blur-xl shadow-glass overflow-hidden"
        >
          {/* Animated Background - Glowing Embers */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,194,194,0.15)_0%,transparent_50%)]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-5xl text-slate-200 tracking-[0.2em]">MEENA</h3>
              <p className="text-blush text-sm font-bold uppercase tracking-[0.3em]">The Keeper of the Spark</p>
              <p className="font-body text-slate-400 text-lg leading-relaxed max-w-sm mx-auto">
                She is the scent of jasmine in a sterile room, a woman armed with poetry and quiet resilience. She agreed to a life of safety, unaware the greatest danger was the man who promised to protect her from himself.
              </p>
            </div>

            <div className="space-y-8 mt-12">
               <div className="relative group cursor-pointer w-fit mx-auto">
                  <blockquote className="font-display text-xl text-slate-300 italic transition-all px-8 text-center group-hover:text-white">
                      {/* FIX: Correctly nested the text inside the ShimmeringText component to provide the required 'children' prop. */}
                      <ShimmeringText>
                        "A whisper in the beginning. A revolution by the end."
                      </ShimmeringText>
                  </blockquote>
                  <Flower2 size={18} className="absolute top-1/2 -right-0 -translate-y-1/2 text-blush opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-safe:animate-pulse" aria-hidden="true" />
              </div>
               <div className="pt-6 border-t border-white/10">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Character Arc</h4>
                  <p className="text-sm text-slate-500 italic max-w-sm mx-auto">
                      From a romantic living in books to the hero of her own story. She transitions from analyzing love to demanding it, realizing her strength is the key to unlocking both his heart and her own.
                  </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* THE INTERPLAY */}
      <motion.div
        className="mt-24 pt-16 border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h3 className="font-display text-3xl text-primary tracking-widest mb-4">The Interplay</h3>
        <p className="text-sm text-slate-500 uppercase tracking-[0.2em] font-bold mb-8">Directorial Notes on Visual Chemistry</p>
        <div className="max-w-3xl mx-auto text-left space-y-6 text-slate-400 font-body leading-relaxed text-lg text-justify">
            <p>
                Their visual collision is a study in temperature. His scenes are drenched in <b className="text-primary font-medium">cool, steely blues</b>—all hard shadows and rigid lines. Hers are bathed in the <b className="text-blush font-medium">warm, diffused gold</b> of a perpetual sunset. When they share a frame, the light itself seems to fight, the air vibrating with the tension between his controlled world and her fluid one.
            </p>
            <p>
                The silence between them is never empty. It is a tangible force, heavy with the weight of unspoken desires. It is the <i className="text-slate-300">quiet before the storm</i> meeting the <i className="text-slate-300">spark that ignites it</i>, a promise of the chaotic combustion to come.
            </p>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

export default CharacterProfiles;