import React from 'react';
import { Crosshair, Zap, Shield, Paintbrush, Award, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { BENEFITS } from '../data';

interface BenefitsGridProps {
  glowBorderColorClass: string;
}

export default function BenefitsGrid({ glowBorderColorClass }: BenefitsGridProps) {
  
  // Robust mapping for Lucide icon components strictly imported from lucide-react
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crosshair':
        return <Crosshair className="w-6 h-6 text-neon-lime" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-neon-lime" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-neon-lime" />;
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-neon-lime" />;
      case 'Award':
        return <Award className="w-6 h-6 text-neon-lime" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-neon-lime" />;
      default:
        return <Crosshair className="w-6 h-6 text-neon-lime" />;
    }
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="benefits-grid">
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Anchor with high contrast styling */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-neon-lime font-bold mb-4 select-none">
            Outcome Metrics
          </div>
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Designed to Unlock Your Full Potential
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-sans">
            Every technical specification in the CAREZ chassis serves a design purpose: to accelerate decision loops and keep your aiming vector consistent.
          </p>
        </div>

        {/* 2x3 Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`bg-dark-card border border-dark-border rounded-xl p-6 sm:p-8 hover:bg-glowing-gray/30 transition-all duration-300 relative group flex flex-col justify-between min-h-[220px] shadow-lg`}
            >
              {/* Outer soft glowing neon overlay linked to customized settings */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ring-2 ring-neon-lime/20 blur-md pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-black/60 rounded-xl border border-white/10 group-hover:border-neon-lime/40 group-hover:bg-neon-lime/5 transition-all">
                    {getIcon(benefit.iconName)}
                  </div>
                  <span className="font-mono text-[9px] text-neon-lime font-black bg-neon-lime/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {benefit.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-neon-lime transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Edge Accent Indicator */}
              <div className="w-6 h-0.5 bg-white/10 group-hover:bg-neon-lime transition-all duration-300 mt-6 rounded"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
