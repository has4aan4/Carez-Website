import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-dark-border py-16 text-gray-500 text-xs relative z-10">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none radial-dot-matrix"></div>

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Side Logo */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-7 h-7 bg-neon-lime flex items-center justify-center font-display font-black text-black text-base skew-x-3">
              C
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white">
              CAREZ
            </span>
          </div>
          <span className="text-gray-500 font-mono text-[10px] text-center md:text-left">
            © {currentYear} CAREZ INC. DOMINATE EVERY VECTOR.
          </span>
        </div>

        {/* Center Links */}
        <nav className="flex items-center justify-center gap-8 text-gray-400 font-medium font-sans">
          <a href="#privacy" className="hover:text-neon-lime transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-neon-lime transition-colors">
            Terms & Conditions
          </a>
          <a href="#support" className="hover:text-neon-lime transition-colors">
            Support Hub
          </a>
        </nav>

        {/* Right Side Social Media Icons */}
        <div className="flex items-center gap-4.5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-sm bg-glowing-gray text-gray-400 hover:text-neon-lime hover:bg-[#D1FF4D]/10 transition-all border border-dark-border hover:border-neon-lime cursor-pointer"
            aria-label="CAREZ on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-sm bg-glowing-gray text-gray-400 hover:text-neon-lime hover:bg-[#D1FF4D]/10 transition-all border border-dark-border hover:border-neon-lime cursor-pointer"
            aria-label="CAREZ on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-sm bg-glowing-gray text-gray-400 hover:text-neon-lime hover:bg-[#D1FF4D]/10 transition-all border border-dark-border hover:border-neon-lime cursor-pointer"
            aria-label="CAREZ on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-sm bg-glowing-gray text-gray-400 hover:text-neon-lime hover:bg-[#D1FF4D]/10 transition-all border border-dark-border hover:border-neon-lime cursor-pointer"
            aria-label="CAREZ on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Compliance / Security footnote banner */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-8 mt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-600 font-mono uppercase">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-neon-lime" />
          <span>Secured transactions • AES-256 Bit Payment Standard</span>
        </div>
        <span>Delivery service supported in over 180 countries</span>
      </div>
    </footer>
  );
}
