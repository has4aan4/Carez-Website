import React, { useState } from 'react';
import { 
  X, Check, ShoppingBag, Truck, ShieldCheck, Mail, ArrowRight, ArrowLeft,
  User, MapPin, Receipt, Gift, Lock, MessageSquare, Phone, Plus, Minus,
  ShieldAlert, Sparkles, MessageCircleCode
} from 'lucide-react';
import { MOUSE_VARIANTS, ADD_ONS } from '../data';
import { MouseVariant, AddOnItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Default Business WhatsApp number in international format as specified
const WHATSAPP_BUSINESS_NUMBER = "923001234567";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCartNotify: () => void;
}

export default function OrderModal({ isOpen, onClose, onAddCartNotify }: OrderModalProps) {
  const [step, setStep] = useState<number>(1); // stepper: 1=config, 2=dispatch_collect, 3=summary_confirm, 4=success
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Selection States
  const [selectedVariant, setSelectedVariant] = useState<string>(MOUSE_VARIANTS[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  
  // Customer Dispatch and Contact coordinates
  const [fullname, setFullname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  
  // Completed Order Details caching
  const [orderId, setOrderId] = useState<string>('');

  const activeVariant = MOUSE_VARIANTS.find(v => v.id === selectedVariant) || MOUSE_VARIANTS[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const incrementQty = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // Pricing calculations
  const basePrice = activeVariant.price;
  const addonsPrice = selectedAddons.reduce((acc, currentId) => {
    const item = ADD_ONS.find(a => a.id === currentId);
    return acc + (item ? item.price : 0);
  }, 0);
  const subtotalPrice = (basePrice + addonsPrice) * quantity;
  const estShipping = 4.99; // Free target applies above index values if any, let's bundle as free
  const freeShippingThreshold = 60.0;
  const shippingCost = subtotalPrice > freeShippingThreshold ? 0 : estShipping;
  const displayTotal = (subtotalPrice + shippingCost).toFixed(2);

  const validateDispatchForm = (): boolean => {
    if (!fullname.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return false;
    }
    if (!phone.trim()) {
      setErrorMsg('Please specify your Phone / Mobile Number.');
      return false;
    }
    // Simple phone pattern check
    if (phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter a valid Phone Number with country / area code.');
      return false;
    }
    if (!address.trim()) {
      setErrorMsg('Please enter your physical Delivery Address.');
      return false;
    }
    return true;
  };

  const generateWhatsAppLink = (): string => {
    // Format options / accessories
    const addonsNames = selectedAddons.map(id => {
      const item = ADD_ONS.find(a => a.id === id);
      return item ? item.name : '';
    }).filter(Boolean);

    const optionText = addonsNames.length > 0 
      ? `\nSelected Options: ${addonsNames.join(', ')}` 
      : '';

    const text = `Hello, I would like to place an order.

Product: Carez Gaming Mouse (${activeVariant.name})${optionText}
Quantity: ${quantity}
Price: $${displayTotal}

Customer Name: ${fullname.trim()}
Phone Number: ${phone.trim()}
Delivery Address: ${address.trim()}

Please confirm my order and provide payment details.`;

    return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!validateDispatchForm()) {
        return;
      }
      setStep(3); // Go to checkout summary section
    } else if (step === 3) {
      triggerWhatsAppOrder();
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    if (step > 1 && step < 4) {
      setStep(prev => prev - 1);
    }
  };

  const triggerWhatsAppOrder = () => {
    // Generate order ID
    const randomId = `CRZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(randomId);

    const waLink = generateWhatsAppLink();
    
    // Open in a new tab
    if (typeof window !== 'undefined') {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    }

    // Advance to Success Congregation Step
    setStep(4);
    onAddCartNotify(); // Call notify event to update cart icons state on parent App index
  };

  const handleCloseReset = () => {
    onClose();
    // Reset inputs slightly delayed to avoid visual jump during slideout transition
    setTimeout(() => {
      setStep(1);
      setErrorMsg('');
      setSelectedVariant(MOUSE_VARIANTS[0].id);
      setSelectedAddons([]);
      setQuantity(1);
      setFullname('');
      setPhone('');
      setAddress('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Shadow overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseReset}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-black border-2 border-dark-border w-full max-w-2xl rounded-xl relative overflow-hidden z-10 shadow-[0_0_50px_rgba(209,255,77,0.15)] flex flex-col md:max-h-[92vh]"
          id="whatsapp-billing-modal"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-dark-border flex items-center justify-between z-10 bg-glowing-gray/30">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neon-lime" />
              <h3 className="font-display font-extrabold text-white text-base sm:text-lg uppercase tracking-wider">
                {step === 4 ? 'WHATSAPP TRANSACTION QUEUED' : 'CONFIGURING YOUR WHATSAPP ORDER'}
              </h3>
            </div>
            
            <button
              onClick={handleCloseReset}
              className="p-1.5 rounded-lg bg-black/40 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper active indicator dots */}
          {step < 4 && (
            <div className="bg-black px-6 py-2.5 flex items-center justify-between border-b border-dark-border text-[10px] font-mono text-gray-500 overflow-x-auto whitespace-nowrap">
              <div className="flex items-center gap-3">
                <span className={step === 1 ? 'text-neon-lime font-bold' : 'text-gray-500'}>1. SETTINGS</span>
                <span className="text-white/20">/</span>
                <span className={step === 2 ? 'text-neon-lime font-bold' : 'text-gray-500'}>2. DISPATCH DESTINATION</span>
                <span className="text-white/20">/</span>
                <span className={step === 3 ? 'text-neon-lime font-bold' : 'text-gray-500'}>3. CONFIRM SUMMARY</span>
              </div>
              <span className="text-neon-lime font-bold ml-4">⚡ DIRECT ORDER DESK</span>
            </div>
          )}

          {/* Body content scrollable area */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-grow text-left">
            
            {/* STEP 1: VARIANT & ADDONS CUSTOMIZER */}
            {step === 1 && (
              <div className="flex flex-col gap-6" id="whatsapp-step-1">
                <div>
                  <label className="text-[10px] font-mono text-neon-lime uppercase tracking-widest block mb-2 font-bold select-none">
                    1. CHOOSE YOUR CHASSIS VARIANT
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {MOUSE_VARIANTS.map((variant) => {
                      const isSel = selectedVariant === variant.id;
                      return (
                        <div
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all relative ${
                            isSel
                              ? 'bg-glowing-gray/40 border-neon-lime font-bold shadow-[0_0_15px_rgba(209,255,77,0.2)]'
                              : 'bg-black border-dark-border hover:border-neon-lime/30'
                          }`}
                        >
                          {isSel && (
                            <div className="absolute top-2.5 right-2.5 bg-neon-lime text-black rounded-full p-0.5">
                              <Check className="w-3 h-3 stroke-[3px]" />
                            </div>
                          )}
                          <div className="w-4.5 h-4.5 rounded-full mb-3 border border-white/10" style={{ backgroundColor: variant.imageColor }} />
                          <h4 className="font-display font-extrabold text-sm text-white">{variant.name}</h4>
                          <span className="text-xs text-neon-lime font-mono mt-1 block">${variant.price}</span>
                          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">{variant.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Companion Accessories checkboxes */}
                <div>
                  <label className="text-[10px] font-mono text-neon-lime uppercase tracking-widest block mb-2 font-bold select-none">
                    2. ADD COMPETITIVE HARDWARE ACCESSORIES
                  </label>
                  <div className="flex flex-col gap-2">
                    {ADD_ONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-glowing-gray/30 border-neon-lime'
                              : 'bg-black border-dark-border hover:border-neon-lime/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                              isChecked ? 'bg-neon-lime border-neon-lime text-black' : 'border-dark-border bg-black'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[4px]" />}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white leading-none">{addon.name}</h4>
                              <p className="text-[10px] text-gray-500 mt-1">{addon.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-neon-lime">+${addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Control Area */}
                <div className="border-t border-dark-border pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-display font-extrabold text-white uppercase">Product Quantity</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase mt-0.5">Order up to 10 limits</span>
                  </div>
                  <div className="flex items-center gap-3 bg-glowing-gray/50 border border-dark-border rounded-xl p-1.5">
                    <button
                      type="button"
                      onClick={decrementQty}
                      className="p-1.5 rounded-lg bg-black text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-white px-2.5 min-w-[20px] text-center select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={incrementQty}
                      className="p-1.5 rounded-lg bg-black text-gray-400 hover:text-white transition-all cursor-pointer border border-white/5 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DISPATCH Coordinates INPUT */}
            {step === 2 && (
              <div className="flex flex-col gap-4 max-w-lg mx-auto" id="whatsapp-step-2">
                <div className="text-center mb-2">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">WHATSAPP DIRECT ROUTING STATION</span>
                  <p className="text-xs text-neon-lime mt-1 font-semibold uppercase">CAREZ SECURE DELIVERY DISPATCH FORM</p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border-2 border-red-500/30 text-red-500 text-xs font-sans rounded-sm text-center">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-neon-lime" /> CUSTOMER FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="p-3 bg-black border-2 border-dark-border rounded-xl text-white text-xs outline-none focus:border-neon-lime"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neon-lime" /> WHATSAPP CONTACT PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="p-3 bg-black border-2 border-dark-border rounded-xl text-white text-xs outline-none focus:border-neon-lime"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neon-lime" /> DETAILED DELIVERY STREET ADDRESS *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 104 Esports Plaza Suite 4B, San Francisco, CA"
                    className="p-3 bg-black border-2 border-dark-border rounded-xl text-white text-xs outline-none focus:border-neon-lime resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2 bg-neon-lime/5 border border-neon-lime/20 px-4 py-3 rounded-xl">
                  <Truck className="w-4 h-4 text-neon-lime shrink-0" />
                  <span className="text-[11px] font-sans text-gray-300">
                    Your shipment includes priority manual routing. Direct delivery confirmations occur in your 1-on-1 chat.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: PREVIEW ORDER MESSAGE SUMMARY */}
            {step === 3 && (
              <div className="flex flex-col gap-5 max-w-lg mx-auto" id="whatsapp-step-3">
                <div className="text-center">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">ORDER SUBMISSION CONSOLE</span>
                  <p className="text-xs text-neon-lime mt-1 font-semibold uppercase flex items-center justify-center gap-1.5">
                    💬 DIRECT TO OFFICIAL CAREZ SUPPORT CHAT
                  </p>
                </div>

                <div className="bg-black border-2 border-dark-border rounded-xl p-5 font-mono text-xs text-gray-300 flex flex-col gap-3 relative shadow-inner">
                  <span className="text-[9px] font-bold text-gray-500 uppercase select-none pb-2 border-b border-white/5 block">
                    ⚡ OUTGOING WHATSAPP PRE-FILLED ENCODING
                  </span>

                  <div className="whitespace-pre-line text-white font-sans bg-glowing-gray/30 p-4.5 rounded-lg border border-white/5 max-h-[220px] overflow-y-auto">
                    {`Hello, I would like to place an order.

Product: Carez Gaming Mouse (${activeVariant.name})${selectedAddons.length > 0 ? ` + ${selectedAddons.length} accessory modules` : ''}
Quantity: ${quantity}
Price: $${displayTotal}

Customer Name: ${fullname}
Phone Number: ${phone}
Delivery Address: ${address}

Please confirm my order and provide payment details.`}
                  </div>

                  <div className="text-[9px] text-gray-500 font-sans mt-2 italic text-center">
                    Notice: Clicking "Order Now on WhatsApp" will safely launch web/app WhatsApp with your encoded message above.
                  </div>
                </div>

                {/* Quick Payment Warning Block */}
                <div className="bg-neon-lime/5 border border-neon-lime/20 rounded-xl p-4 flex flex-col gap-2">
                  <span className="font-display font-extrabold text-xs text-neon-lime uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Payment Confirmation Instructions
                  </span>
                  <ul className="list-disc pl-5 text-[11px] text-gray-400 space-y-1">
                    <li>Customers place orders and receive instructions directly through WhatsApp chat.</li>
                    <li>Official secure payment details are provided directly by our sales Support Team.</li>
                    <li>Once payment is complete, upload your transaction receipt screenshot directly inside WhatsApp.</li>
                    <li>Manual verification will be completed instantly to queue your dispatch!</li>
                  </ul>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS EXPLANATORY CARD */}
            {step === 4 && (
              <div className="flex flex-col gap-6 max-w-md mx-auto items-center text-center py-4" id="whatsapp-step-4">
                <div className="w-16 h-16 bg-neon-lime/10 border-2 border-neon-lime text-neon-lime rounded-full flex items-center justify-center animate-pulse">
                  <Check className="w-8 h-8 stroke-[3px]" />
                </div>

                <div>
                  <h4 className="font-display font-black text-2xl text-white uppercase tracking-wider">WHATSAPP PORTAL LAUNCHED</h4>
                  <p className="text-xs text-neon-lime mt-1 uppercase font-mono">Simulated Order Ticket: {orderId}</p>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  We have loaded your customized inventory configuration. If WhatsApp did not open automatically in a new tab, please click the button below to join the secure chat now.
                </p>

                {/* Backup WhatsApp Direct Link */}
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded bg-[#25D366] text-black font-display font-black text-xs uppercase tracking-widest text-center shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-[1.01] transition-transform duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircleCode className="w-4 h-4 text-black fill-black" />
                  <span>Resume WhatsApp Chat</span>
                </a>

                <div className="bg-dark-card border border-dark-border p-4 rounded-xl text-[11px] text-gray-400 w-full text-left font-sans">
                  <span className="font-bold text-white block mb-1">💡 What to do next:</span>
                  1. Send the pre-filled message inside the WhatsApp chat app.<br />
                  2. Wait for our certified support representative to provide payment coordinates.<br />
                  3. Transmit payment and upload screen proof inside the chat to lock in priority shipment.
                </div>

                <button
                  type="button"
                  onClick={handleCloseReset}
                  className="text-xs text-gray-500 hover:text-white uppercase font-mono tracking-widest pt-2 underline cursor-pointer"
                >
                  Return to Combat Station
                </button>
              </div>
            )}

          </div>

          {/* Combined footer pricing summary calculations (Steps 1, 2, 3 only) */}
          {step < 4 && (
            <div className="p-6 border-t border-dark-border bg-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Estimated Order Total</span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">
                  ${displayTotal} <span className="text-xs text-gray-400 font-mono">USD</span>
                </span>
                <span className="text-[9px] font-mono text-neon-lime mt-1 flex items-center gap-1">
                  <Gift className="w-3 h-3 text-neon-lime" /> FREE SHIPPING TARGET ENGAGED
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-5 py-4 border border-dark-border hover:bg-white/5 text-white rounded-lg font-display font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
                
                <button
                  onClick={handleNextStep}
                  className="flex-grow sm:flex-grow-0 px-6 py-4 rounded bg-neon-lime hover:bg-white text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(209,255,77,0.3)] hover:scale-[1.01] transform transition-all font-sans"
                >
                  <span>
                    {step === 1 ? 'PROCEED TO DISPATCH' : step === 2 ? 'PROCEED TO CONFIRM' : 'ORDER NOW ON WHATSAPP'}
                  </span>
                  {step === 3 ? (
                    <MessageCircleCode className="w-4 h-4 text-black fill-black" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-black" />
                  )}
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
