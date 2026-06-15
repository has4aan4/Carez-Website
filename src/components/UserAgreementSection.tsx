import React, { useState } from 'react';
import { FileCheck, BookOpen, AlertOctagon, HelpCircle, Check, Scale, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UserAgreementSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const agreements = [
    {
      icon: Scale,
      title: "1. Acceptance of Terms",
      summary: "By initiating an order request via WhatsApp, you recognize and accept these terms.",
      details: "This application runs a decentralized 1-on-1 manual verification service via WhatsApp. By clicking 'Order Now on WhatsApp', you confirm that you are over the age of majority in your jurisdiction and that you authorize our customer representatives to communicate, verify, and complete transactions securely with you over encrypted chat channels."
    },
    {
      icon: AlertOctagon,
      title: "2. Payment and Settlement Method",
      summary: "Manual settlement rules, screenshot verification, and zero automatic card custody logic.",
      details: "We do not store payment details or handle automatic transaction settlement online. You agree to follow the manual secure payment steps issued inside the official WhatsApp chat. Payment verification relies on manually transmitted screenshot confirmations. Once certified by our live agents, the shipment queue is officially locked."
    },
    {
      icon: FileCheck,
      title: "3. Shipping, Defect Policy & Tournament Legality",
      summary: "Free Priority Postage eligibility standards, global courier limits, and hardware regulations.",
      details: "Shipping transit takes approximately 2-3 standard business days. Any damage or physical defects from transit must be documented with video evidence and sent into the WhatsApp support line within 72 hours of arrival for a full swap. Additionally, the Carez Gaming Mouse hardware complies with standard global esports regulatory guidelines and is fully authorized for competitive tournament usage."
    },
    {
      icon: BookOpen,
      title: "4. Intellectual Property and Sandboxed Firmware",
      summary: "Licenses regarding driver firmware calibration and non-commercial usage.",
      details: "Any included calibration configurations, onboard custom profile profiles, RGB software profiles, and custom button profiles are licensed for personal, non-commercial use only. Unauthorized flashing of custom modified kernels onto the gaming mouse MCU will instantly void any service warranties provided by Carez Support."
    }
  ];

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="user-agreement">
      {/* Visual glowing grid matrix backgrounds */}
      <div className="absolute inset-0 opacity-5 pointer-events-none radial-dot-matrix"></div>
      <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-neon-lime/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/30 text-[10px] text-neon-lime font-mono uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5 text-neon-lime" /> Certified Licensing Framework
          </div>
          
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            User Agreement
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Please review our manual transaction guidelines, warranty conditions, and decentralized software configuration limits.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4">
          {agreements.map((item, idx) => {
            const IconComp = item.icon;
            const isOpen = activeItem === idx;

            return (
              <div 
                key={idx}
                className={`border-2 rounded-xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-glowing-gray/40 border-neon-lime shadow-[0_0_20px_rgba(209,255,77,0.1)]' 
                    : 'bg-dark-card border-dark-border hover:border-neon-lime/20'
                }`}
              >
                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setActiveItem(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg border transition-all ${
                      isOpen ? 'bg-neon-lime border-neon-lime text-black' : 'bg-black border-white/5 text-gray-400'
                    }`}>
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1 font-sans">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-gray-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-neon-lime" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Sub Body Details with Motion support */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-dark-border text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                        <p className="bg-black/45 p-4 rounded-lg border border-white/5">
                          {item.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Micro Disclaimer */}
        <div className="mt-8 text-center text-gray-500 font-mono text-[10px] uppercase">
          ⚔️ END USER LICENSING SCHEME • LAST UPDATED JUNE 2026 • OFFICIAL DOCUMENT 9.B
        </div>

      </div>
    </section>
  );
}
