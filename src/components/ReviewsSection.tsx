import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, PlusCircle, MessageSquare, Award, User, Sparkles, Check } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // Custom Form State
  const [authorName, setAuthorName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [setup, setSetup] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Read from localStorage otherwise populate with static INITIAL_REVIEWS set
    const saved = localStorage.getItem('carez_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const persistReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem('carez_reviews', JSON.stringify(updated));
  };

  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) return; // prevent duplicate clicks
    
    const updated = reviews.map(rev => {
      if (rev.id === id) {
        return { ...rev, likes: rev.likes + 1 };
      }
      return rev;
    });
    
    setLikedReviews([...likedReviews, id]);
    persistReviews(updated);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) return;

    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      author: authorName,
      role: role || 'FPS Gamer',
      rating: rating,
      text: text,
      date: 'Just now',
      avatarSeed: authorName.toLowerCase().replace(/\s+/g, '-'),
      setupType: setup || 'Pro Rig Station',
      likes: 0
    };

    const updated = [newReview, ...reviews];
    persistReviews(updated);
    
    // Clear Form & Show Success state
    setAuthorName('');
    setRole('');
    setSetup('');
    setText('');
    setFormSuccess(true);
    
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
    }, 2500);
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-dark-border" id="reviews">
      <div className="absolute inset-0 opacity-10 pointer-events-none radial-dot-matrix"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Header elements */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-dark-border pb-8">
          <div className="max-w-xl animate-fade-in">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#D1FF4D] font-bold mb-4 select-none">
              Gamer Accolades
            </div>
            <h2 className="font-display font-black italic uppercase tracking-tighter text-3xl sm:text-4xl md:text-5xl text-white mt-1">
              Endorsed by Elite Players
            </h2>
            <p className="text-gray-400 text-sm mt-3 font-sans">
              See how competitive champions and content design partners configure their Carez Mouse for pixel-perfect targeting.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-4 bg-neon-lime text-black font-display font-black text-xs uppercase tracking-widest rounded-sm hover:scale-105 transition-all shadow-[0_10px_30px_rgba(209,255,77,0.2)] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Add Your Review
          </button>
        </div>

        {/* Aggregate Stats Dashboard Bar */}
        <div className="bg-dark-card border border-dark-border p-6 rounded-xl mb-12 flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left max-w-5xl mx-auto font-mono">
          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">OVERALL SATISFACTION</span>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-display font-black text-white">4.9</span>
              <div className="flex flex-col">
                <div className="flex gap-0.5 text-neon-lime">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-neon-lime text-neon-lime" />)}
                </div>
                <span className="text-[10px] font-mono text-gray-500 mt-1 uppercase">BASED ON 412 RATINGS</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] md:w-[1px] md:h-12 bg-dark-border w-full md:block"></div>

          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">PRO RECOMMENDATION RATE</span>
            <span className="block font-display font-black text-2xl sm:text-3xl text-neon-lime mt-1">99.2%</span>
          </div>

          <div className="h-[1px] md:w-[1px] md:h-12 bg-dark-border w-full md:block"></div>

          <div>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">RATED "ULTRA-FAST" CYCLES</span>
            <span className="block font-display font-black text-2xl sm:text-3xl text-white mt-1">100% SENSOR MATCH</span>
          </div>
        </div>

        {/* Add Review Drawer Slider */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-dark-card border border-[#D1FF4D]/30 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto mb-12 overflow-hidden shadow-2xl"
            >
              {formSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-neon-lime/10 text-neon-lime flex items-center justify-center border border-neon-lime">
                    <Check className="w-6 h-6 stroke-[3px]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">Review Broadcasted Successfully!</h3>
                  <p className="text-gray-400 text-xs font-sans">Thank you for submitting your gamer setup diagnostics.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-white mb-2 uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neon-lime" /> Share Your Gaming Rig Specs
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 font-mono">
                      <label className="text-[10px] text-gray-400 uppercase">GAMER NAME *</label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Shroud_Fan99"
                        className="p-3 bg-black border border-dark-border text-white text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 font-mono">
                      <label className="text-[10px] text-gray-400 uppercase">TITLE / PRO COMPETITION</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. CS2 Gold Master / Hobbyist"
                        className="p-3 bg-black border border-dark-border text-white text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 font-mono">
                      <label className="text-[10px] text-gray-400 uppercase">STALLION SETUP TYPE</label>
                      <input
                        type="text"
                        value={setup}
                        onChange={(e) => setSetup(e.target.value)}
                        placeholder="e.g. RGB Prism Glass Tower Build"
                        className="p-3 bg-black border border-dark-border text-white text-xs outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 font-mono">
                      <label className="text-[10px] text-gray-400 uppercase">EVALUATION RATING</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="p-3 bg-black border border-dark-border text-white text-xs outline-none"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Elite 5/5</option>
                        <option value="4">⭐⭐⭐⭐ Snappy 4/5</option>
                        <option value="3">⭐⭐⭐ Standard 3/5</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 font-mono">
                    <label className="text-[10px] text-gray-400 uppercase">YOUR FEEDBACK TEXT *</label>
                    <textarea
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Discuss tracking precision, weight dynamics, paracord flexibility..."
                      rows={3}
                      className="p-3 bg-black border border-dark-border text-white text-xs outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-4 rounded-sm bg-neon-lime text-black font-display font-black text-xs uppercase tracking-widest hover:scale-[1.01] transition-all cursor-pointer shadow-[0_10px_30px_rgba(209,255,77,0.2)]"
                  >
                    Submit Performance Rating
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Testimonial cards list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((rev) => {
            const hasLiked = likedReviews.includes(rev.id);
            return (
              <div
                key={rev.id}
                id={rev.id}
                className="bg-dark-card border border-dark-border p-6 rounded-xl flex flex-col justify-between hover:border-neon-lime/20 transition-colors shadow-md"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between mb-4.5">
                    <div className="flex gap-0.5 text-neon-lime">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-neon-lime text-neon-lime' : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-gray-500">{rev.date}</span>
                  </div>

                  {/* Testimonial body text */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Testimonial User Meta */}
                <div className="border-t border-dark-border pt-4 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-glowing-gray border border-dark-border flex items-center justify-center font-display font-black text-neon-lime text-xs">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="block font-display font-bold text-xs text-white">
                        {rev.author}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-mono uppercase">
                        {rev.role}
                      </span>
                    </div>
                  </div>

                  {/* Likes/Engagement Widget */}
                  <button
                    onClick={() => handleLike(rev.id)}
                    className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-sm border transition-all cursor-pointer ${
                      hasLiked
                        ? 'bg-neon-lime/10 border-neon-lime/20 text-neon-lime font-bold'
                        : 'bg-black/40 border-dark-border text-gray-400 hover:text-white hover:border-neon-lime/30'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'fill-neon-lime' : ''}`} />
                    <span>{rev.likes}</span>
                  </button>
                </div>

                {/* Setup Category identifier badge */}
                <div className="mt-4 pt-1.5 border-t border-dark-border flex items-center gap-1 font-mono text-[9px] text-gray-500 uppercase">
                  <span className="font-bold text-gray-400">Setup:</span> 
                  <span className="truncate max-w-[180px]">{rev.setupType}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
