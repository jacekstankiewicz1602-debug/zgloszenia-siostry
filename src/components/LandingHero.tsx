import { motion } from 'framer-motion';

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image - Luxurious Italian Town */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: 'url("/bg-narni.jpg")',
          filter: 'brightness(0.55) contrast(1.1)'
        }}
      ></div>
      
      {/* Dark Overlay for Sleek Luxury Vibe */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-[#050505]/40 to-transparent"></div>
      <div className="absolute inset-0 z-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
            <path d="M12 2v20M5 8h14" />
          </svg>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-7xl font-serif-luxury text-white mb-4 tracking-widest drop-shadow-2xl uppercase"
        >
          Spotkanie <br/> z Siostrami z Narni
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-24 h-px bg-gold mx-auto mb-6 opacity-80"
        ></motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-xl text-gray-200 font-light mb-12 tracking-wide max-w-2xl text-center"
        >
          Zarejestruj swój udział w wyjątkowym wydarzeniu.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={onStart}
          className="px-12 py-5 bg-gold text-black font-serif-luxury font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
        >
          Formularz Zgłoszeniowy
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/60 cursor-pointer"
        onClick={onStart}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </motion.div>
    </div>
  );
}
