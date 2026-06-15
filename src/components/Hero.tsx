import React from 'react';
import { Zap, Award, Target, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBuyNowClick: () => void;
  mouseImagePath: string;
}

export default function Hero({ onBuyNowClick, mouseImagePath }: HeroProps) {
  const [imageError, setImageError] = React.useState<boolean>(false);

  const handleScrollToSpecs = () => {
    const element = document.getElementById('specs');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-black">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-15 pointer-events-none radial-dot-matrix"></div>

      {/* Cyber Radio Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-neon-lime/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[200px] h-[200px] rounded-full bg-pink-500/5 blur-[80px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Side: Copy and Conversion Hooks */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tech Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-6 select-none"
          >
            <Zap className="w-3.5 h-3.5 fill-neon-lime animate-pulse" />
            <span>Carez Apex Series • Now Released</span>
          </motion.div>

          {/* Core high-impact headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black italic uppercase tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6"
          >
            Dominate Every <br />
            <span className="text-neon-lime drop-shadow-[0_0_20px_rgba(209,255,77,0.5)]">Game with Precision.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl max-w-xl font-normal leading-relaxed mb-8 font-sans"
          >
            Experience lightning-fast response times, ergonomic comfort, and elite gaming performance with the CAREZ Gaming Mouse.
          </motion.p>

          {/* Responsive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3 w-full sm:w-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary Order via WhatsApp Button */}
              <button
                onClick={onBuyNowClick}
                className="px-10 py-5 rounded-sm bg-neon-lime text-black font-display font-black text-xs uppercase tracking-widest text-center shadow-[0_0_20px_rgba(209,255,77,0.4)] hover:shadow-[0_0_35px_rgba(209,255,77,0.7)] hover:bg-white hover:scale-105 transform transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-black text-black" />
                <span>Order Now on WhatsApp – $79.99</span>
              </button>

              {/* Secondary Specifications */}
              <button
                onClick={handleScrollToSpecs}
                className="px-10 py-5 rounded-sm bg-transparent border border-dark-border text-white font-display font-bold text-xs uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Specifications
              </button>
            </div>
            
            {/* Secondary CTA support text */}
            <span className="text-[10px] text-gray-500 font-mono tracking-wider mt-1 text-center sm:text-left select-none">
              Fast Order Confirmation • Secure Payment Instructions • Direct WhatsApp Support
            </span>
          </motion.div>

          {/* Social Proof Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-4"
          >
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg sm:text-2xl text-neon-lime">52g</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide font-mono">Ultra-light</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg sm:text-2xl text-white">8,000Hz</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide font-mono">Polling rate</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-lg sm:text-2xl text-white">26K DPI</span>
              <span className="text-gray-400 text-xs uppercase tracking-wide font-mono">Sensor</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Product Showcase Graphics */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* Hex / Ring Background Graphic */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-neon-lime/20 border-dashed animate-spin [animation-duration:60s] pointer-events-none"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] rounded-full border-2 border-neon-lime/5 shadow-[0_0_50px_rgba(209,255,77,0.05)] pointer-events-none"
          ></motion.div>

          {/* Main Mouse Render Container */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [0, -12, 0], opacity: 1 }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 4.5,
                ease: 'easeInOut'
              },
              opacity: { duration: 0.8, delay: 0.2 }
            }}
            className="relative z-10 w-[240px] h-[240px] sm:w-[360px] sm:h-[360px]"
          >
            {!imageError ? (
              <img
                src={mouseImagePath}
                alt="Carez Next-gen Gaming Mouse"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(209,255,77,0.3)] hover:scale-[1.05] transition-transform duration-500 rounded-3xl"
              />
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full text-neon-lime" style={{ color: '#D1FF4D' }}>
                <defs>
                  <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Mouse Ambient Aura Shadow */}
                <ellipse cx="50" cy="85" rx="30" ry="8" fill="rgba(209,255,77,0.15)" />
                
                {/* Main Mouse Chassis */}
                <path
                  d="M 50 15 
                     C 35 15, 23 28, 23 48 
                     C 23 62, 28 85, 50 85 
                     C 72 85, 77 62, 77 48 
                     C 77 28, 65 15, 50 15 Z"
                  fill="#0c0c0c"
                  stroke="#D1FF4D"
                  strokeWidth="1.5"
                  filter="url(#glow-effect)"
                />

                {/* Left & Right Click Separation & Split Line */}
                <path d="M 50 15 L 50 48" stroke="#D1FF4D" strokeWidth="1" strokeDasharray="1 1" />
                <path d="M 23 48 C 35 48, 65 48, 77 48" stroke="#1c1c1c" strokeWidth="1" />

                {/* Scroll Wheel */}
                <rect x="47.5" y="24" width="5" height="12" rx="2.5" fill="#171717" stroke="#D1FF4D" strokeWidth="1" />
                <line x1="50" y1="26" x2="50" y2="34" stroke="#D1FF4D" strokeWidth="1" />

                {/* DPI Button */}
                <rect x="48.5" y="40" width="3" height="5" rx="1.5" fill="#D1FF4D" />

                {/* Honeycomb Aesthetic Grids inside the palm rest area */}
                <g opacity="0.45" fill="none" stroke="#D1FF4D" strokeWidth="0.5">
                  <polygon points="50,60 53,62 53,66 50,68 47,66 47,62" />
                  <polygon points="44,65 47,67 47,71 44,73 41,71 41,67" />
                  <polygon points="56,65 59,67 59,71 56,73 53,71 53,67" />
                  <polygon points="50,70 53,72 53,76 50,78 47,76 47,72" />
                </g>

                {/* Accent Side Grips */}
                <path d="M 23 50 C 26 55, 26 68, 24 75" fill="none" stroke="#D1FF4D" strokeWidth="1" />
                <path d="M 77 50 C 74 55, 74 68, 76 75" fill="none" stroke="#D1FF4D" strokeWidth="1" />
              </svg>
            )}
          </motion.div>

          {/* Adaptive Holographic Pointer Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute top-10 right-10 flex items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-[10px] text-gray-400"
          >
            <Target className="w-3 h-3 text-neon-lime" />
            <span>Precision Optical Sensor</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-5 flex items-center gap-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-[10px] text-gray-400"
          >
            <Award className="w-3 h-3 text-neon-lime" />
            <span>Ergonomic 52g Shell</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <button
          onClick={handleScrollToFeatures}
          className="flex flex-col items-center gap-2 text-xs font-mono text-gray-400 hover:text-neon-lime transition-all duration-300 animate-bounce cursor-pointer"
        >
          <span>EXPLORE CAREZ</span>
          <ChevronDown className="w-4 h-4 text-neon-lime" />
        </button>
      </div>
    </section>
  );
}
