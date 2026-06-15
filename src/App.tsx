import React, { useState } from 'react';
import { Sparkles, Trophy, Zap, Clock, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuickNav from './components/QuickNav';
import FeaturesShowcase from './components/FeaturesShowcase';
import BenefitsGrid from './components/BenefitsGrid';
import SpecsSection from './components/SpecsSection';
import ReviewsSection from './components/ReviewsSection';
import WhatsAppPaymentInfo from './components/WhatsAppPaymentInfo';
import WhatsAppSupportSection from './components/WhatsAppSupportSection';
import PrivacyPolicySection from './components/PrivacyPolicySection';
import UserAgreementSection from './components/UserAgreementSection';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import { CustomRgbColor } from './types';
import { RGB_OPTIONS } from './data';

// Import the mouse image asset for Vite-safe compiling and Netlify production compatibility
import carezMouseImg from './assets/images/carez_mouse_1780661465376.png';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<CustomRgbColor>('lime');
  const [cartCount, setCartCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Path to our dynamically generated asset resolved securely through Vite bundler
  const mouseImagePath = carezMouseImg;

  const handleBuyNowTrigger = () => {
    setIsOrderModalOpen(true);
  };

  const activeColorDetails = RGB_OPTIONS.find(c => c.id === selectedColor) || RGB_OPTIONS[0];

  const handleOrderNotification = () => {
    setCartCount(prev => prev + 1);
    setIsOrderModalOpen(false);
    setToastMessage('WHATSAPP CHAT LAUNCHED! REVIEW PRE-FILLED TICKETS!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="bg-black text-white relative min-h-screen selection:bg-neon-lime selection:text-black font-sans">
      
      {/* Toast Notification for Success Purchases */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#121212] border-2 border-dark-border px-6 py-4.5 rounded-sm flex items-center gap-3 shadow-[0_0_30px_rgba(209,255,77,0.25)] w-[90%] max-w-md"
          >
            <div className="w-9 h-9 rounded-full bg-neon-lime/10 flex items-center justify-center text-neon-lime shrink-0">
              <Zap className="w-4.5 h-4.5 fill-neon-lime" />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-neon-lime font-black uppercase tracking-wider">SECURE TELEMETRY SUCCESS</span>
              <p className="text-white font-display font-bold text-xs mt-0.5 leading-normal">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Sticky Header */}
      <Header onBuyNowClick={handleBuyNowTrigger} cartCount={cartCount} />

      {/* Main Hero Section with Floating Image Render */}
      <Hero onBuyNowClick={handleBuyNowTrigger} mouseImagePath={mouseImagePath} />

      {/* Quick Jump Sub Navigation bar */}
      <QuickNav />

      {/* Core Advantages section & click/sound customize panels */}
      <FeaturesShowcase
        mouseImagePath={mouseImagePath}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* 2x3 Benefit Outcome Matrix deck */}
      <BenefitsGrid glowBorderColorClass={activeColorDetails.borderClass} />

      {/* Tech Spec Sheet comparative bar charts */}
      <SpecsSection />

      {/* Payment Confirmation via WhatsApp section */}
      <WhatsAppPaymentInfo />

      {/* Customer Support via WhatsApp section */}
      <WhatsAppSupportSection />

      {/* Gamer Privacy Policy section */}
      <PrivacyPolicySection />

      {/* Gamer User Agreement section */}
      <UserAgreementSection />

      {/* Gamer Reviews with Local Storage integrations */}
      <ReviewsSection />

      {/* Final Action Urgency Section */}
      <section className="bg-black py-28 relative overflow-hidden border-t border-dark-border flex items-center justify-center text-center">
        {/* Neon Vector Light Glow rings */}
        <div className="absolute w-[400px] h-[400px] bg-neon-lime/5 rounded-full blur-[140px] pointer-events-none"></div>
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>

        <div className="relative max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
          {/* Tag highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-6 select-none"
          >
            Presale allocation remaining
          </motion.div>

          {/* Heading */}
          <h2 className="font-display font-black italic uppercase tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white leading-none max-w-2xl mb-6">
            Upgrade Your <br className="sm:hidden" />
            <span className="text-neon-lime drop-shadow-[0_0_20px_rgba(209,255,77,0.5)]">Gameplay Today.</span>
          </h2>

          {/* Core Support Copy */}
          <p className="text-gray-300 text-sm sm:text-lg max-w-lg mb-8 leading-relaxed font-sans">
            Experience professional-level precision and performance with the Carez Gaming Mouse. Take advantage of limited free accessory bundles.
          </p>

          {/* Neon action buy button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNowTrigger}
            className="px-10 py-5 rounded-sm bg-neon-lime text-black font-display font-black text-xs uppercase tracking-widest text-center shadow-[0_0_25px_rgba(209,255,77,0.4)] hover:shadow-[0_0_35px_rgba(209,255,77,0.7)] hover:bg-white transform transition-all duration-300 cursor-pointer text-sm"
            id="final-cta-buy-now"
          >
            Order Now on WhatsApp
          </motion.button>

          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-3 select-none">
            Fast Order Confirmation • Secure Payment Instructions • Direct WhatsApp Support
          </span>

          {/* Dynamic Microcopy layout requested in design brief */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[10px] font-mono text-gray-400 uppercase">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neon-lime" /> No Setup Required
            </span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neon-lime" /> Fast Shipping Available
            </span>
          </div>
        </div>
      </section>

      {/* Styled Footer Columns */}
      <Footer />

      {/* Multi-step Configurator and Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onAddCartNotify={handleOrderNotification}
      />
    </div>
  );
}
