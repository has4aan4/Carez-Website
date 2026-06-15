import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onBuyNowClick: () => void;
  cartCount: number;
}

export default function Header({ onBuyNowClick, cartCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStockCount, setLiveStockCount] = useState(14); // scarcity tracker

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Dynamic stock depletion simulation to drive landing conversions
    const interval = setInterval(() => {
      setLiveStockCount(prev => {
        if (prev <= 3) return prev;
        return prev - (Math.random() > 0.7 ? 1 : 0);
      });
    }, 45000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of dry header
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
    <>
      <header
        id="carez-primary-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-dark-border py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 cursor-pointer select-none group"
          >
            <span className="font-display font-black text-2xl tracking-tighter text-neon-lime">
              CAREZ
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('specs')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Specs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('support')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Support
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('privacy')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Privacy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('user-agreement')}
              className="hover:text-neon-lime transition-colors relative group py-2 cursor-pointer"
            >
              Agreement
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-lime transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center gap-5">
            {/* Urgency Counter indicator */}
            <div className="flex items-center gap-1.5 bg-glowing-gray px-3.5 py-1.5 rounded-full border border-dark-border text-xs text-neon-lime font-mono animate-pulse">
              <Flame className="w-3.5 h-3.5 text-neon-lime" />
              <span>STOCK LIMIT: {liveStockCount} LEFT</span>
            </div>

            {/* Cart Widget Indicator */}
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-glowing-gray p-2 border border-dark-border rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                onClick={onBuyNowClick}
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                <span className="absolute -top-1.5 -right-1.5 bg-neon-lime text-black font-display font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              </motion.div>
            )}

            {/* Buy Now Call-to-action */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBuyNowClick}
              className="px-6 py-2 bg-transparent border-2 border-neon-lime text-neon-lime text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(209,255,77,0.3)] hover:bg-neon-lime hover:text-black hover:shadow-[0_0_25px_rgba(209,255,77,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Buy Now
            </motion.button>
          </div>

          {/* Mobile Right Bar controls */}
          <div className="flex md:hidden items-center gap-3">
            {cartCount > 0 && (
              <button
                onClick={onBuyNowClick}
                className="relative bg-white/5 p-2 rounded-lg text-white"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-neon-lime text-black font-display font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-glowing-gray text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-b border-white/10 px-6 py-8 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-1.5 font-mono text-xs text-neon-lime">
                <Flame className="w-4 h-4 fill-neon-lime" />
                <span>LIMIT PRESALE • STOCK AT {liveStockCount} UNITS</span>
              </div>
            </div>

             <nav className="flex flex-col gap-5 text-lg font-display">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('specs')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                Specifications
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('support')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                Support Hub
              </button>
              <button
                onClick={() => scrollToSection('privacy')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => scrollToSection('user-agreement')}
                className="text-left py-1.5 text-gray-300 hover:text-neon-lime transition-colors"
              >
                User Agreement
              </button>
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBuyNowClick();
                }}
                className="w-full py-3.5 rounded bg-neon-lime text-black font-display font-black text-center text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(209,255,77,0.35)] hover:shadow-[0_4px_30px_rgba(209,255,77,0.5)] cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
