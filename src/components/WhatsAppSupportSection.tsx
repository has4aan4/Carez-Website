import React, { useState } from 'react';
import { 
  MessageSquare, Send, Clock, Sparkles, HelpCircle, 
  LifeBuoy, ShieldCheck, HeartHandshake, ChevronRight, MessageCircleCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SUPPORT_NUMBER = "923001234567";

export default function WhatsAppSupportSection() {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('Order Status Enquiry');
  const [message, setMessage] = useState<string>('');
  const [successPing, setSuccessPing] = useState<boolean>(false);

  const categories = [
    "Order Status Enquiry",
    "Hardware Calibration",
    "Custom Accessory Bundles",
    "Warranty & Returns",
    "General Esports Chat"
  ];

  const handleLaunchSupport = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const formattedMessage = `Hello Carez Support!

Category: ${category}
Customer Name: ${name.trim() || 'Elite Gamer'}
Question: ${message.trim()}

Please assist me.`;

    const url = `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
    
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Flash success notification state
    setSuccessPing(true);
    setTimeout(() => {
      setSuccessPing(false);
      setMessage('');
    }, 4000);
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="support">
      {/* Visual glowing overlay grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-neon-lime/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-4 select-none">
            Direct Support Datastream
          </div>
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Customer Support on WhatsApp
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
            Skip complex robot queue agents. Message our live gamer representatives directly on WhatsApp for real human assistance in seconds.
          </p>
        </div>

        {/* 2-Column Split Console layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Static Trust & Support Statistics Elements (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Realtime Operational Status Indicator Card */}
            <div className="bg-dark-card border-2 border-dark-border rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-lime"></span>
                </div>
                <span className="font-mono text-xs text-neon-lime uppercase font-black tracking-widest">
                  Live Operational & Online
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-white uppercase tracking-wider mb-2">
                24/7 Gamer Support Desk
              </h3>
              
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                Our support team comprises actual esports gamers who understand calibration DPI, lift-off distances, and custom switches. Receive expert engineering support.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">Avg. Response Time</span>
                  <span className="text-white font-display font-extrabold text-base">&lt; 3 Minutes</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">SLA Satisfaction</span>
                  <span className="text-neon-lime font-display font-extrabold text-base">99.8% Perfect</span>
                </div>
              </div>
            </div>

            {/* Support Trust Badges */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4.5 bg-glowing-gray/30 border border-dark-border rounded-xl">
                <div className="p-2.5 bg-black border border-white/5 rounded-lg text-neon-lime shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Fast WhatsApp Support</h4>
                  <p className="text-gray-400 text-xs mt-1 leading-normal">Operational 365 days a year including tournament weekends.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4.5 bg-glowing-gray/30 border border-dark-border rounded-xl">
                <div className="p-2.5 bg-black border border-white/5 rounded-lg text-neon-lime shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Secure Order Confirmation</h4>
                  <p className="text-gray-400 text-xs mt-1 leading-normal">Direct encrypted link eliminates credential leaks and bot interference.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4.5 bg-glowing-gray/30 border border-dark-border rounded-xl">
                <div className="p-2.5 bg-black border border-white/5 rounded-lg text-neon-lime shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Manual Order Verification</h4>
                  <p className="text-gray-400 text-xs mt-1 leading-normal">Personalized order confirmation of parameters to prevent delivery mismatch errors.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Interactive pre-filled Support Message Generator Widget (7 Cols) */}
          <div className="lg:col-span-7" id="whatsapp-widget-form">
            <form 
              onSubmit={handleLaunchSupport}
              className="bg-[#0b0b0b] border-2 border-dark-border rounded-xl p-6 sm:p-8 relative shadow-2xl text-left"
            >
              {/* Internal subtle header icon decoration */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-neon-lime animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                    COMPILING SUPPORT TELEMETRY
                  </span>
                </div>
                <div className="px-2.5 py-0.5 rounded bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-mono text-[9px] uppercase font-bold select-none">
                  Secure Chat link
                </div>
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {successPing && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-neon-lime/10 border border-neon-lime/30 text-neon-lime text-xs font-sans rounded-lg flex items-center gap-2"
                  >
                    <MessageCircleCode className="w-4 h-4" />
                    <span>WhatsApp portal initiated! Type your request inside your WhatsApp app.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input for Full Name */}
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  Your Gamer Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zephyr Prime (Optional)"
                  className="p-3 bg-black border border-dark-border rounded-xl text-white text-xs outline-none focus:border-neon-lime font-sans w-full"
                />
              </div>

              {/* Interactive Category Selector Grid */}
              <div className="mb-4">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                  Select Inquiry Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, idx) => {
                    const isSelected = category === cat;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setCategory(cat)}
                        className={`text-xs px-3.5 py-2 rounded-lg font-sans border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-neon-lime text-black border-neon-lime font-bold'
                            : 'bg-black text-gray-400 border-dark-border hover:border-neon-lime/40 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Content Area */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  Type Your Message or Question *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Hi team, I would like to verify if the Red Core Switch works with high humidity or what is the tracking number of my shipment?"
                  className="p-3 bg-black border border-dark-border rounded-xl text-white text-xs outline-none focus:border-neon-lime font-sans resize-none w-full"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4.5 rounded bg-neon-lime text-black font-display font-black text-xs uppercase tracking-widest text-center shadow-[0_0_20px_rgba(209,255,77,0.3)] hover:shadow-[0_0_30px_rgba(209,255,77,0.6)] hover:bg-white transition-all transform hover:scale-[1.01] active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4.5 h-4.5 text-black fill-black" />
                <span>Launch WhatsApp Support Chat</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-[9px] text-gray-500 font-mono text-center uppercase tracking-wide">
                💬 Opens official support desk at +92 300 1234567 • Securely Verified Client Handshake
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
