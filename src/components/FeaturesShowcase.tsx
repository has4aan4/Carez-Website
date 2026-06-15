import React, { useState, useRef, useEffect } from 'react';
import { Target, Zap, Sparkles, Shield, Award, Cpu, Flame, Check, Play, RefreshCw, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RGB_OPTIONS } from '../data';
import { CustomRgbColor } from '../types';

interface FeaturesShowcaseProps {
  mouseImagePath: string;
  selectedColor: CustomRgbColor;
  setSelectedColor: (color: CustomRgbColor) => void;
}

export default function FeaturesShowcase({
  mouseImagePath,
  selectedColor,
  setSelectedColor
}: FeaturesShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>('rgb'); // default load on customizer
  const [dpi, setDpi] = useState<number>(3200);
  const [imageError, setImageError] = useState<boolean>(false);

  // Reaction Game State
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'now' | 'success' | 'early'>('idle');
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  // Ergonomics Grid State
  const [gripStyle, setGripStyle] = useState<'palm' | 'claw' | 'fingertip'>('palm');

  // Mechanical Click Counter
  const [clickCount, setClickCount] = useState<number>(65213038);

  // Web Audio Synth for Custom Switches Sound
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Snappy mechanical click synthesis
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
      
      setClickCount(prev => prev + 1);
    } catch (e) {
      // safe fallback if audio context blocked/unsupported
      setClickCount(prev => prev + 1);
    }
  };

  // Reaction Game Lifecycle
  const startReactionGame = () => {
    setReactionState('waiting');
    setReactionTime(null);
    
    if (gameTimer) clearTimeout(gameTimer);
    
    const delay = 1500 + Math.random() * 2500; // random 1.5 - 4s
    const timer = setTimeout(() => {
      setReactionState('now');
      setGameStartTime(performance.now());
    }, delay);
    
    setGameTimer(timer);
  };

  const handleTestClick = () => {
    if (reactionState === 'waiting') {
      if (gameTimer) clearTimeout(gameTimer);
      setReactionState('early');
    } else if (reactionState === 'now') {
      const endTime = performance.now();
      const difference = Math.round(endTime - gameStartTime);
      setReactionTime(difference);
      setReactionState('success');
    }
  };

  useEffect(() => {
    return () => {
      if (gameTimer) clearTimeout(gameTimer);
    };
  }, [gameTimer]);

  const activeColorDetails = RGB_OPTIONS.find(c => c.id === selectedColor) || RGB_OPTIONS[0];

  const featuresList = [
    {
      id: 'tracking',
      title: 'Precision Tracking',
      description: 'Carez ultra-precision optical sensor traces flawless movements across glass substrates with custom polling filters.',
      icon: Target
    },
    {
      id: 'latency',
      title: 'Ultra-Fast Response',
      description: 'Zero debounce delays engineered straight onto core circuits provides sub-millisecond optical activation.',
      icon: Zap
    },
    {
      id: 'rgb',
      title: 'RGB Customizer',
      description: 'Tailor light gradients to match battle setups. Enjoy responsive illumination across 5 custom onboard color zones.',
      icon: Sparkles
    },
    {
      id: 'ergo',
      title: 'Ergonomic Support',
      description: 'A structural mold optimized side-by-side with esports pros reduces fatigue and stabilizes vertical wrist rotation.',
      icon: Shield
    },
    {
      id: 'switches',
      title: 'Durable Optical Switches',
      description: 'Built to survive millions of action points. Rated up to 90 million clicks without standard mechanical decay.',
      icon: Award
    },
    {
      id: 'plug',
      title: 'Plug-and-Play Memory',
      description: 'Connect anywhere seamlessly. Carry mouse sensitivity profiles directly onto driverless embedded storage.',
      icon: Cpu
    }
  ];

  return (
    <div className="bg-black py-24 border-t border-dark-border relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION 1: The Core Advantage */}
        <div id="features" className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-4 select-none">
            The Core Advantage
          </div>
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Built for Competitive Gaming
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans">
            Engineered inside and out to support ultimate esports execution. Combining featherweight honeycomb dynamics with state-of-the-art sensory technology.
          </p>
        </div>

        {/* Feature Icons Accent Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24 max-w-5xl mx-auto">
          {[
            { tag: '0.125ms', label: 'Speed response' },
            { tag: 'CAREZ CORES', label: 'Custom optical sensor' },
            { tag: '5-ZONE RGB', label: 'Color highlights' },
            { tag: '52 GRAMS', label: 'Featherlight chassis' },
            { tag: 'PTFE GLIDES', label: 'Smooth skates' }
          ].map((item, index) => (
            <div key={index} className="bg-glowing-gray border border-dark-border rounded-xl p-4 text-center hover:border-neon-lime/20 transition-colors">
              <span className="block font-display font-black text-neon-lime text-xs tracking-[0.2em] uppercase mb-1">{item.tag}</span>
              <span className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        {/* SECTION 2: Interactive Feature Split */}
        <div id="performance" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-16 pb-4">
          
          {/* LEFT SIDE: Interactive Button List */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            <div className="mb-4">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">TAP FEATURES TO INTERACT</span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">Explore Core Physics</h3>
            </div>
            
            {featuresList.map(feature => {
              const Icon = feature.icon;
              const isSelected = activeTab === feature.id;
              
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`w-full text-left p-4.5 rounded-xl transition-all cursor-pointer flex items-start gap-4 border ${
                    isSelected
                      ? `bg-glowing-gray/40 text-white ${activeColorDetails.borderClass}`
                      : 'bg-transparent border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                  }`}
                  id={`feature-${feature.id}`}
                >
                  <div className={`p-2.5 rounded-lg ${
                    isSelected ? 'bg-neon-lime/10 text-neon-lime' : 'bg-white/5 text-gray-400'
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? activeColorDetails.textColor : ''}`} />
                  </div>
                  <div>
                    <h4 className={`font-display font-extrabold text-base transition-colors ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: Dynamic Sandbox Environment */}
          <div id="customizer" className="lg:col-span-7 bg-glowing-gray/20 rounded-2xl border border-white/10 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            
            {/* Ambient Lighting Ring synced to color state */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] pointer-events-none rounded-full"
                 style={{
                   background: `radial-gradient(circle, ${activeColorDetails.hex}18 0%, transparent 65%)`
                 }}
            ></div>

            {/* Title Indicator inside the customizer */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4.5 z-10 w-full mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeColorDetails.hex }} />
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                  SYSTEM CORE: <span style={{ color: activeColorDetails.hex }}>{activeTab.toUpperCase()}</span>
                </span>
              </div>
              <span className="font-mono text-xs text-neon-lime px-2.5 py-0.5 rounded-full bg-neon-lime/10">ACTIVE LAB</span>
            </div>

            {/* TAB CONTENT SANDBOX PANELS WITH ANIMATION */}
            <div className="flex-grow flex items-center justify-center min-h-[380px] z-10">
              <AnimatePresence mode="wait">
                
                {/* 1. RGB LIGHTING CUSTOMIZER PANEL */}
                {activeTab === 'rgb' && (
                  <motion.div
                    key="rgb-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col items-center gap-8"
                  >
                    <div className="relative group w-[220px] h-[220px]">
                      {/* Dynamic Neon Outline behind mouse matching chosen color */}
                      <div className={`absolute inset-0 rounded-full blur-[40px] transition-all duration-500 opacity-60`}
                           style={{ backgroundColor: activeColorDetails.hex }}
                      />
                      {!imageError ? (
                        <img
                          src={mouseImagePath}
                          alt="Carez RGB Render"
                          referrerPolicy="no-referrer"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 text-neon-lime transition-all duration-500" style={{ color: activeColorDetails.hex }}>
                          <defs>
                            <filter id="features-glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          {/* Mouse Ambient Aura Shadow */}
                          <ellipse cx="50" cy="85" rx="30" ry="8" fill="rgba(255,255,255,0.05)" />
                          
                          {/* Main Mouse Chassis */}
                          <path
                            d="M 50 15 
                               C 35 15, 23 28, 23 48 
                               C 23 62, 28 85, 50 85 
                               C 72 85, 77 62, 77 48 
                               C 77 28, 65 15, 50 15 Z"
                            fill="#0c0c0c"
                            stroke={activeColorDetails.hex}
                            strokeWidth="1.5"
                            filter="url(#features-glow)"
                          />

                          {/* Left & Right Click Separation & Split Line */}
                          <path d="M 50 15 L 50 48" stroke={activeColorDetails.hex} strokeWidth="1" strokeDasharray="1 1" />
                          <path d="M 23 48 C 35 48, 65 48, 77 48" stroke="#1c1c1c" strokeWidth="1" />

                          {/* Scroll Wheel */}
                          <rect x="47.5" y="24" width="5" height="12" rx="2.5" fill="#171717" stroke={activeColorDetails.hex} strokeWidth="1" />
                          <line x1="50" y1="26" x2="50" y2="34" stroke={activeColorDetails.hex} strokeWidth="1" />

                          {/* DPI Button */}
                          <rect x="48.5" y="40" width="3" height="5" rx="1.5" fill={activeColorDetails.hex} />

                          {/* Honeycomb Aesthetic Grids inside the palm rest area */}
                          <g opacity="0.5" fill="none" stroke={activeColorDetails.hex} strokeWidth="0.5">
                            <polygon points="50,60 53,62 53,66 50,68 47,66 47,62" />
                            <polygon points="44,65 47,67 47,71 44,73 41,71 41,67" />
                            <polygon points="56,65 59,67 59,71 56,73 53,71 53,67" />
                            <polygon points="50,70 53,72 53,76 50,78 47,76 47,72" />
                          </g>

                          {/* Accent Side Grips */}
                          <path d="M 23 50 C 26 55, 26 68, 24 75" fill="none" stroke={activeColorDetails.hex} strokeWidth="1" />
                          <path d="M 77 50 C 74 55, 74 68, 76 75" fill="none" stroke={activeColorDetails.hex} strokeWidth="1" />
                        </svg>
                      )}
                    </div>

                    <div className="w-full border-t border-white/5 pt-6 text-center">
                      <p className="text-gray-300 font-display font-extrabold text-sm mb-3">CONVERT YOUR SETUP ILLUMINATION</p>
                      
                      <div className="flex items-center justify-center gap-4">
                        {RGB_OPTIONS.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedColor(opt.id)}
                            className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer flex items-center justify-center`}
                            style={{
                              backgroundColor: opt.hex,
                              borderColor: selectedColor === opt.id ? '#FFFFFF' : 'rgba(255,255,255,0.1)'
                            }}
                            title={opt.name}
                          >
                            {selectedColor === opt.id && (
                              <Check className="w-4 h-4 text-black stroke-[3px]" />
                            )}
                          </button>
                        ))}
                      </div>
                      <span className="block text-[11px] font-mono text-gray-400 mt-3 uppercase tracking-wider">
                        Current Profile: <strong style={{ color: activeColorDetails.hex }}>{activeColorDetails.name}</strong>
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 2. PRECISION TRACKING / DPI ADJUSTER PANEL */}
                {activeTab === 'tracking' && (
                  <motion.div
                    key="tracking-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col gap-6"
                  >
                    <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col gap-4 font-mono">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">OPTICAL ENCODING TYPE:</span>
                        <span className="text-neon-lime">CAREZ-AURA-26K</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">MOTION PATTERN STABILITY:</span>
                        <span className="text-white">99.8% pixel match rate</span>
                      </div>
                      
                      {/* Interactive Jitter Dot Matrix Demo */}
                      <div className="h-28 bg-black/80 rounded-lg relative overflow-hidden border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-x-0 h-[1px] bg-white/5 top-1/2"></div>
                        <div className="absolute inset-y-0 w-[1px] bg-white/5 left-1/2"></div>
                        
                        {/* Interactive Simulated Target Crosshair */}
                        <div className="absolute border border-neon-lime/20 rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
                          <div className="w-1.5 h-1.5 bg-neon-lime rounded-full"></div>
                        </div>

                        {/* Tiny jitter pixels generated based on DPI */}
                        {[...Array(20)].map((_, i) => {
                          const jitterAmount = (dpi / 26000) * 35;
                          const randomX = (Math.random() - 0.5) * jitterAmount + 50;
                          const randomY = (Math.random() - 0.5) * jitterAmount + 50;
                          return (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full transition-all duration-75"
                              style={{
                                left: `${randomX}%`,
                                top: `${randomY}%`,
                                backgroundColor: activeColorDetails.hex,
                                opacity: 0.6
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Slider input */}
                    <div className="bg-black/30 border border-white/5 p-5 rounded-xl">
                      <div className="flex items-center justify-between mb-3 text-sm">
                        <span className="text-gray-300 font-display font-medium">Sensitivity Setup</span>
                        <span className="text-neon-lime font-mono font-bold text-lg" style={{ color: activeColorDetails.hex }}>
                          {dpi.toLocaleString()} DPI
                        </span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="26000"
                        step="50"
                        value={dpi}
                        onChange={(e) => setDpi(Number(e.target.value))}
                        className="w-full bg-glowing-gray h-2.5 rounded-lg appearance-none cursor-pointer accent-neon-lime"
                        style={{ accentColor: activeColorDetails.hex }}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                        <span>100 DPI (Sniper Precision Mode)</span>
                        <span>26,000 DPI (Hyper Speed Esports)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. REACTION CLICK GAME MODE */}
                {activeTab === 'latency' && (
                  <motion.div
                    key="latency-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col gap-6"
                  >
                    <div className="text-center">
                      <h4 className="font-display font-extrabold text-sm text-white mb-1.5 uppercase">Test Your Reflex Latency</h4>
                      <p className="text-gray-400 text-xs mb-4">Click as soon as the screen flashes neon green. CAREZ delivers 0.125ms input delivery!</p>
                    </div>

                    {/* Reaction Area Canvas */}
                    <div
                      onClick={handleTestClick}
                      className={`h-48 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border cursor-pointer select-none relative ${
                        reactionState === 'idle' ? 'bg-black/60 border-white/5 hover:bg-black/80' : ''
                      } ${
                        reactionState === 'waiting' ? 'bg-red-950/20 border-red-500/30' : ''
                      } ${
                        reactionState === 'now' ? 'bg-neon-lime text-black border-neon-lime shadow-[0_0_40px_rgba(209,255,77,0.3)]' : ''
                      } ${
                        reactionState === 'success' ? 'bg-black border-neon-lime/40' : ''
                      } ${
                        reactionState === 'early' ? 'bg-red-950/40 border-red-500' : ''
                      }`}
                    >
                      {reactionState === 'idle' && (
                        <div className="flex flex-col items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startReactionGame();
                            }}
                            className="bg-neon-lime text-black px-6 py-2.5 rounded-lg font-display text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-black" />
                            Start Test
                          </button>
                        </div>
                      )}

                      {reactionState === 'waiting' && (
                        <div className="flex flex-col items-center gap-2 animate-pulse text-gray-500 font-mono text-sm">
                          <span>WAITING FOR FLOOD LIGHT...</span>
                        </div>
                      )}

                      {reactionState === 'now' && (
                        <div className="flex flex-col items-center text-center font-display font-black text-2xl tracking-tighter text-black select-none pointer-events-none">
                          <Zap className="w-8 h-8 fill-black mb-1 animate-bounce" />
                          <span>CLICK NOW!</span>
                        </div>
                      )}

                      {reactionState === 'early' && (
                        <div className="flex flex-col items-center gap-3 text-center">
                          <span className="text-red-500 font-display font-black tracking-widest text-sm">TOO EARLY TRIGGER!</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startReactionGame();
                            }}
                            className="text-xs text-white underline flex items-center gap-1 hover:text-red-400 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" /> Retry Test
                          </button>
                        </div>
                      )}

                      {reactionState === 'success' && reactionTime && (
                        <div className="flex flex-col items-center gap-2 text-center px-4">
                          <span className="text-[10px] font-mono text-gray-500">YOUR REACTION LATENCY INDICATION:</span>
                          <span className="text-4xl font-display font-black text-neon-lime">{reactionTime} ms</span>
                          
                          <div className="bg-white/5 border border-white/5 px-4 py-1.5 rounded-lg text-[10px] font-mono text-gray-400 max-w-sm mt-1">
                            <span>Including CAREZ processing lag: <strong>+0.12ms</strong> (vs up to <strong>+8.0ms</strong> on old mice!)</span>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startReactionGame();
                            }}
                            className="text-xs text-neon-lime underline flex items-center gap-1 mt-2 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" /> Test Again
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 4. ERGONOMIC BIO-METRIC ANALYSIS */}
                {activeTab === 'ergo' && (
                  <motion.div
                    key="ergo-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {(['palm', 'claw', 'fingertip'] as const).map(style => (
                        <button
                          key={style}
                          onClick={() => setGripStyle(style)}
                          className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                            gripStyle === style
                              ? 'bg-neon-lime/10 text-white border-neon-lime'
                              : 'bg-black/40 text-gray-400 border-white/5 hover:border-white/10'
                          }`}
                        >
                          <span className="block font-display font-extrabold text-xs uppercase tracking-wide">{style}</span>
                          <span className="text-[10px] text-gray-500 font-mono mt-0.5">Setup Grip</span>
                        </button>
                      ))}
                    </div>

                    {/* Grip Bio score display */}
                    <div className="bg-black/50 border border-white/5 p-5 rounded-2xl grid grid-cols-2 gap-4 font-mono text-xs">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-gray-500 uppercase">Comfort rating:</span>
                        <span className="text-white text-sm font-bold">
                          {gripStyle === 'palm' ? '⭐⭐⭐⭐⭐ 100%' : gripStyle === 'claw' ? '⭐⭐⭐⭐⭐ 98%' : '⭐⭐⭐⭐ 88%'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-gray-500 uppercase">Fatigue friction:</span>
                        <span className="text-neon-lime text-sm font-bold">
                          {gripStyle === 'palm' ? '0% Pressure strain' : gripStyle === 'claw' ? 'Minimal drift risk' : 'Tactile response burst'}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5 col-span-2 border-t border-white/5 pt-3">
                        <span className="text-gray-500 uppercase">Grip recommendation:</span>
                        <p className="text-gray-400 text-[11px] font-sans leading-normal normal-case">
                          {gripStyle === 'palm'
                            ? 'Perfect for tactical snipers requiring slow controlled motions on a heavy speed pad.'
                            : gripStyle === 'claw'
                            ? 'Best for fast-twitch MOBA and RTS actions allowing intense reflex triggers.'
                            : 'Optimal for ultra-fast tracking with minimal surface contact requirement.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. DURABLE SWITCH TESTING CONSOLE */}
                {activeTab === 'switches' && (
                  <motion.div
                    key="switches-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col items-center gap-6 text-center"
                  >
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-white mb-1.5 uppercase">Zero Double-Click Optical Switch</h4>
                      <p className="text-gray-400 text-xs mb-4">Click button to hear synthetic high-fidelity optical trigger sound.</p>
                    </div>

                    {/* Interactive Sonic Button */}
                    <motion.button
                      whileDown={{ scale: 0.93 }}
                      onClick={playClickSound}
                      className="w-32 h-32 rounded-full bg-gradient-to-tr from-glowing-gray to-black border-2 border-neon-lime/40 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(209,255,77,0.1)] hover:shadow-[0_0_30px_rgba(209,255,77,0.3)] hover:border-neon-lime transition-all"
                      style={{ borderColor: activeColorDetails.hex }}
                    >
                      <Volume2 className="w-8 h-8 mb-1.5" style={{ color: activeColorDetails.hex }} />
                      <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-bold">TAP TO TRIGGER</span>
                    </motion.button>

                    <div className="bg-black/30 w-full px-5 py-3 rounded-xl border border-white/5 font-mono text-xs text-gray-400 text-center">
                      <span>Total simulated stress cycles remaining:</span>
                      <strong className="block font-semibold text-lg text-white mt-1">
                        {clickCount.toLocaleString()}
                      </strong>
                    </div>
                  </motion.div>
                )}

                {/* 6. PLUG AND PLAY MEMORY CUSTOMIZER */}
                {activeTab === 'plug' && (
                  <motion.div
                    key="plug-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex flex-col gap-6"
                  >
                    <div className="text-center mb-1">
                      <h4 className="font-display font-extrabold text-sm text-white mb-1 uppercase">Embedded Driverless Profiler</h4>
                      <p className="text-gray-400 text-xs text-center">Save key layouts straight onto CAREZ. Zero bloatware tools required.</p>
                    </div>

                    <div className="bg-black/50 border border-white/5 p-4 rounded-xl flex flex-col gap-3 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500">MAPPED COMPARTMENT:</span>
                        <span className="text-neon-lime" style={{ color: activeColorDetails.hex }}>SLOT-01 ONBOARD</span>
                      </div>
                      
                      {/* Interactive Button Configuration Mockup */}
                      {[
                        { num: 'Button 1', role: 'Primary Mouse Click' },
                        { num: 'Button 4', role: 'DPI Adjust Switch (Loop)' },
                        { num: 'Button 5', role: 'Quick Melee Attack (FPS Map)' }
                      ].map((btn, index) => (
                        <div key={index} className="flex items-center justify-between bg-black/60 border border-white/5 p-2.5 rounded hover:bg-black/80 transition-colors">
                          <span className="text-white font-bold">{btn.num}</span>
                          <span className="text-gray-400">{btn.role}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
