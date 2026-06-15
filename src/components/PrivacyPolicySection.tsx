import React, { useState } from 'react';
import { Shield, Eye, Lock, FileText, ChevronDown, ChevronUp, UserCheck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PrivacyPolicySection() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const policyItems = [
    {
      icon: Lock,
      title: "No Payment Credentials Retained",
      summary: "We don't hold credit cards, digital keys, or deposit credentials on server clusters.",
      details: "Because we run a fully decentralized WhatsApp Order System, your transactional and settlement coordinates are handled entirely 1-on-1 inside WhatsApp with end-to-end cryptographic encryption under WhatsApp security protocols. There are zero central databases containing client financial logs to compromise."
    },
    {
      icon: Eye,
      title: "Zero Tracker Cookie Zero Ad Retargeting Policy",
      summary: "No telemetry fingerprints, profiling engines, or pixel analytics trackers.",
      details: "We respect the gaming code. We do not feed tracking pixels (e.g., Meta Pixel, Google Analytics) to track your movements. Your device stats, clicks, and gameplay preferences are strictly transient to customize the real-time responsive RGB sliders and browser audio synthesizer."
    },
    {
      icon: UserCheck,
      title: "Minimal Dispatch Information",
      summary: "Only shipping parameters are collected manually via WhatsApp for physical fulfillment.",
      details: "Your Name, WhatsApp number, and delivery street address are used solely for the courier tracking index to dispatch your package. This shipping manifest is deleted from our terminal queues exactly 30 days after your gaming mouse arrived safely."
    },
    {
      icon: ShieldAlert,
      title: "Consumer Rights & Erasure Datastream",
      summary: "Request complete erasure of all records through local customer support.",
      details: "At any moment, you can message our WhatsApp Support Hotline to request an instant wipe of your shipping logs and active orders history. We run strict privacy compliance without bureaucratized wait times."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveAccordion(prev => (prev === index ? null : index));
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="privacy">
      {/* Visual background atmospheric lights */}
      <div className="absolute inset-0 opacity-5 pointer-events-none radial-dot-matrix"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-neon-lime/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-lime/10 border border-neon-lime/30 text-[10px] text-neon-lime font-mono uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5 fill-neon-lime/20" /> Player-First Data Protection
          </div>
          
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Privacy & Data Policy
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            We value your confidentiality as much as your high refresh speed. Learn how your order coordinates are processed securely under our non-custodial gaming sandbox model.
          </p>
        </div>

        {/* Policy Accordion items */}
        <div className="flex flex-col gap-4">
          {policyItems.map((item, index) => {
            const IconComp = item.icon;
            const isOpen = activeAccordion === index;
            
            return (
              <div 
                key={index}
                className={`border-2 rounded-xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-glowing-gray/40 border-neon-lime shadow-[0_0_20px_rgba(209,255,77,0.1)]' 
                    : 'bg-dark-card border-dark-border hover:border-neon-lime/20'
                }`}
              >
                {/* Header block */}
                <button
                  onClick={() => toggleAccordion(index)}
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

                {/* Sub-body Details with Smooth Motion Transition */}
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
                        <p className="bg-black/40 p-4 rounded-lg border border-white/5">
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
          🛡️ CAREZ INC is GDPR & CCPA non-custodial compliant • Sandbox version: 2026.06.A
        </div>

      </div>
    </section>
  );
}
