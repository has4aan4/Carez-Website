import React, { useState } from 'react';
import { Cpu, Target, Zap, Feather, Sparkles, Wifi, MousePointer, Monitor, Info, Check, X, BarChart } from 'lucide-react';
import { SPECIFICATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function SpecsSection() {
  const [selectedSpec, setSelectedSpec] = useState<string>('polling');
  const [showComparison, setShowComparison] = useState<boolean>(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-neon-lime" />;
      case 'Target': return <Target className="w-5 h-5 text-neon-lime" />;
      case 'Zap': return <Zap className="w-5 h-5 text-neon-lime" />;
      case 'Feather': return <Feather className="w-5 h-5 text-neon-lime" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-neon-lime" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-neon-lime" />;
      case 'MousePointer': return <MousePointer className="w-5 h-5 text-neon-lime" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-neon-lime" />;
      default: return <Cpu className="w-5 h-5 text-neon-lime" />;
    }
  };

  const selectedSpecData = SPECIFICATIONS.find(s => s.key === selectedSpec) || SPECIFICATIONS[0];

  // Data for the comparison chart highlights
  const comparisonData = {
    polling: {
      title: 'Latency Breakdown (Lower is Better)',
      competitor1: { name: 'Standard Office Mouse', val: 8.0, unit: 'ms' },
      competitor2: { name: 'E-Sports Rival Mouse', val: 1.0, unit: 'ms' },
      carez: { name: 'CAREZ Gaming Mouse', val: 0.125, unit: 'ms' },
      ratio: '8x faster click transmission'
    },
    weight: {
      title: 'Structural Mass (Lower is Better)',
      competitor1: { name: 'E-Sports Wired Clone', val: 82, unit: 'g' },
      competitor2: { name: 'Standard Wireless Mouse', val: 69, unit: 'g' },
      carez: { name: 'CAREZ Pro Honeycomb', val: 52, unit: 'g' },
      ratio: 'Up to 36% less friction fatigue'
    },
    dpi: {
      title: 'Resolution Index (Higher is Better)',
      competitor1: { name: 'Office Workhorse Model', val: 1200, unit: 'DPI' },
      competitor2: { name: 'Standard Gamer Entry', val: 16000, unit: 'DPI' },
      carez: { name: 'CAREZ Optical Elite', val: 26000, unit: 'DPI' },
      ratio: '2.1x finer resolution targeting precision'
    }
  };

  // Safe fallback to polling if key hasn't explicitly listed in comparisonData list
  const currentChartKey = ['polling', 'weight', 'dpi'].includes(selectedSpec)
    ? (selectedSpec as 'polling' | 'weight' | 'dpi')
    : 'polling';

  const chart = comparisonData[currentChartKey];

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="specs">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Elements */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-neon-lime font-bold mb-4 select-none">
            Technical Specs
          </div>
          <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Engineered Down to the Microsecond
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 font-sans">
            Tap on any technical card to inspect diagnostic metrics, dynamic tolerances, and head-to-head premium gaming performance matrices.
          </p>
        </div>

        {/* Specs Grid + Comparative Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of Specs in dark cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPECIFICATIONS.map((spec) => {
              const isActive = selectedSpec === spec.key;
              return (
                <div
                  key={spec.key}
                  onClick={() => setSelectedSpec(spec.key)}
                  className={`p-5 rounded-xl cursor-pointer text-left transition-all duration-300 border hover:scale-[1.01] ${
                    isActive
                      ? 'bg-glowing-gray border-neon-lime shadow-[0_0_15px_rgba(209,255,77,0.15)]'
                      : 'bg-dark-card border-dark-border hover:bg-glowing-gray/40 hover:border-neon-lime/30'
                  }`}
                  id={`spec-card-${spec.key}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-neon-lime/20 text-neon-lime' : 'bg-black/40'}`}>
                      {getIcon(spec.iconName)}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-widest text-gray-500">
                        {spec.label}
                      </span>
                      <span className="text-white font-display font-extrabold text-sm sm:text-base mt-0.5 block">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Detailed Diagnostic Panel */}
          <div className="lg:col-span-5 bg-dark-card border border-dark-border p-6 sm:p-8 rounded-xl relative overflow-hidden flex flex-col justify-between self-stretch shadow-2xl">
            {/* Background Laser glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-lime/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between mb-6 border-b border-dark-border pb-4">
                <span className="font-mono text-xs text-neon-lime uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Info className="w-3.5 h-3.5" /> SPEC DIAGNOSTIC REPORT
                </span>
                <span className="text-[10px] font-mono text-gray-500">REV. 2026.1</span>
              </div>

              {/* Dynamic Info Showcase */}
              <h3 className="font-display font-extrabold text-xl text-white mb-2">
                {selectedSpecData.label}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                {selectedSpecData.description}
              </p>

              {/* Benchmarking Comparison Widget */}
              {showComparison && (
                <div className="bg-black/60 border border-dark-border p-5 rounded-xl mt-4">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-dark-border">
                    <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1 uppercase font-bold">
                      <BarChart className="w-3 h-3 text-neon-lime" /> {chart.title}
                    </span>
                  </div>

                  {/* Competitor 1 Bar */}
                  <div className="mb-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span>{chart.competitor1.name}</span>
                      <span>{chart.competitor1.val} {chart.competitor1.unit}</span>
                    </div>
                    <div className="h-2 bg-glowing-gray rounded-full overflow-hidden">
                      <div className="h-full bg-gray-600" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Competitor 2 Bar */}
                  <div className="mb-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                      <span>{chart.competitor2.name}</span>
                      <span>{chart.competitor2.val} {chart.competitor2.unit}</span>
                    </div>
                    <div className="h-2 bg-glowing-gray rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400"
                        style={{
                          width: `${(chart.competitor2.val / chart.competitor1.val) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* CAREZ Pro Extreme bar */}
                  <div className="mb-4 font-mono">
                    <div className="flex items-center justify-between text-xs text-white font-extrabold mb-1">
                      <span className="text-neon-lime">CAREZ Elite Performance</span>
                      <span className="text-neon-lime font-mono">{chart.carez.val} {chart.carez.unit}</span>
                    </div>
                    <div className="h-2.5 bg-glowing-gray rounded-full overflow-hidden shadow-[0_0_8px_rgba(209,255,77,0.3)]">
                      <div
                        className="h-full bg-neon-lime transition-all duration-500"
                        style={{
                          width: `${(chart.carez.val / chart.competitor1.val) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-neon-lime/5 border border-neon-lime/15 px-3 py-2 rounded-lg text-center">
                    <span className="text-[11px] font-mono text-neon-lime font-semibold uppercase tracking-wider block">
                      ⚡ IMPACT: {chart.ratio}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick stats highlight footer */}
            <div className="mt-8 pt-4 border-t border-dark-border text-xs text-gray-500 flex items-center justify-between font-mono">
              <span>On-board storage profile: YES</span>
              <span>Driver software: Optional</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
