import { useRef } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onSecretTrigger: () => void;
}

export function Header({ onSecretTrigger }: HeaderProps) {
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCrossClick = () => {
    clickCount.current += 1;
    
    if (clickCount.current === 3) {
      onSecretTrigger();
      clickCount.current = 0;
      if (clickTimer.current) clearTimeout(clickTimer.current);
    } else {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1500); // Reset clicks after 1.5 seconds if 3 clicks not reached
    }
  };

  return (
    <header className="mb-10 text-center relative no-print">
      {/* Golden Cross - Absolute positioned top left */}
      <div 
        className="absolute -top-4 -left-4 md:-top-6 md:-left-6 cursor-pointer p-2 z-20 group"
        onClick={handleCrossClick}
        title="✨"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="text-gold opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 2v20M5 8h14" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex justify-center items-center gap-2 mb-2">
          {/* Star Accents */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          <h1 className="text-3xl md:text-5xl font-serif-luxury text-gold tracking-widest uppercase">
            Karta Zgłoszeniowa
          </h1>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="h-px bg-gold/30 w-12 md:w-24"></div>
          <p className="text-sm md:text-base font-medium tracking-[0.2em] text-[#5c4a3d] uppercase px-4">
            Spotkanie z Siostrami z Narni
          </p>
          <div className="h-px bg-gold/30 w-12 md:w-24"></div>
        </div>
      </motion.div>
    </header>
  );
}
