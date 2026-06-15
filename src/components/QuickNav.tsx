import React, { useState, useEffect } from 'react';

export default function QuickNav() {
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'performance', 'reviews', 'specs'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130; // secondary sticky nav offset
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
    <div className="sticky top-[60px] md:top-[68px] left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/5 py-4.5">
      <div className="max-w-xl mx-auto px-4">
        <ul className="flex items-center justify-between font-display text-xs text-gray-400 font-extrabold uppercase tracking-widest">
          <li>
            <button
              onClick={() => handleClick('features')}
              className={`hover:text-white transition-colors cursor-pointer relative pb-1 ${
                activeSection === 'features' ? 'text-neon-lime' : ''
              }`}
            >
              Features
              {activeSection === 'features' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-lime"></span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('performance')}
              className={`hover:text-white transition-colors cursor-pointer relative pb-1 ${
                activeSection === 'performance' ? 'text-neon-lime' : ''
              }`}
            >
              Performance
              {activeSection === 'performance' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-lime"></span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('reviews')}
              className={`hover:text-white transition-colors cursor-pointer relative pb-1 ${
                activeSection === 'reviews' ? 'text-neon-lime' : ''
              }`}
            >
              Reviews
              {activeSection === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-lime"></span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('specs')}
              className={`hover:text-white transition-colors cursor-pointer relative pb-1 ${
                activeSection === 'specs' ? 'text-neon-lime' : ''
              }`}
            >
              Specifications
              {activeSection === 'specs' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-lime"></span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
