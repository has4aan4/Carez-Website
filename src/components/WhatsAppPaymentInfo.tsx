import React from 'react';
import { 
  MessageSquare, ShieldCheck, ClipboardCheck, Clock, 
  HelpCircle, Sparkles, Send, CheckCircle2, QrCode, FileCheck2 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppPaymentInfo() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Place Your Order",
      desc: "Customize your Carez Gaming Mouse and add competitive accessories. Click the WhatsApp button to generate your pre-filed order sheet."
    },
    {
      icon: ShieldCheck,
      title: "Get Secure Details",
      desc: "Our sales support team will instantly review your customized configuration and provide official, direct payment instructions inside the chat."
    },
    {
      icon: CheckCircle2,
      title: "Confirm Your Deal",
      desc: "Complete the transaction using your preferred secure method (e.g., bank transfer, digital wallet, or cards as outlined by the agent)."
    },
    {
      icon: FileCheck2,
      title: "Verifiable Dispatch",
      desc: "Upload a payment receipt screenshot right into the WhatsApp chat. Once manually verified, your tracking link will be generated instantly!"
    }
  ];

  const trustBadges = [
    { title: "24/7 WhatsApp Support", desc: "Expert gamers ready to assist at any hour." },
    { title: "Secure Order Confirmation", desc: "Direct 1-on-1 certified business verification." },
    { title: "Fast Response Time", desc: "Average response in under 5 minutes!" },
    { title: "Manual Order Verification", desc: "Prevents automated bots, errors, or lost shipping details." }
  ];

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="payment-confirmation">
      {/* Background radial highlight */}
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-neon-lime/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-4 select-none">
            Secure Purchasing Route
          </div>
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Payment Confirmation via WhatsApp
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
            We have replaced high-friction, vulnerable checkout portals with a direct, manual 1-on-1 WhatsApp confirmation engine to prevent automated orders and ensure instant shipping priority.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={idx}
                className="bg-dark-card border border-dark-border p-6 rounded-xl hover:border-neon-lime/30 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="absolute top-3 right-4 font-mono text-3xl text-white/5 font-black group-hover:text-neon-lime/5 transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <div className="p-3 bg-black/60 border border-white/5 text-neon-lime rounded-xl w-fit mb-5 group-hover:bg-neon-lime/10 group-hover:border-neon-lime/30 transition-all">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-neon-lime transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="w-8 h-0.5 bg-white/10 group-hover:bg-neon-lime transition-all duration-500 mt-6 rounded"></div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustBadges.map((badge, index) => {
              return (
                <div key={index} className="flex flex-col text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse"></div>
                    <h4 className="font-display font-extrabold text-sm text-neon-lime uppercase tracking-wider">
                      {badge.title}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Subtext info */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-500 font-mono tracking-wider flex flex-wrap items-center justify-center gap-2">
            <span>🛡️ DIRECT SECUREMENT DEPOSIT</span>
            <span>•</span>
            <span>💬 INSTANT DIALOG WITH LIVE SUPPORT AGENTS</span>
            <span>•</span>
            <span>📦 MANUAL PRIORITY WAREHOUSE ENQUEUEING</span>
          </div>
        </div>

      </div>
    </section>
  );
}
