import React from 'react';
import { motion } from 'framer-motion';

interface FormSectionProps {
  title: string;
  number: number;
  children: React.ReactNode;
  delay?: number;
}

export function FormSection({ title, number, children, delay = 0 }: FormSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-12 relative"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-8 h-8 rounded-full border border-gold text-gold flex items-center justify-center font-serif-luxury text-sm shrink-0">
          {number}
        </div>
        <h2 className="text-xl md:text-2xl font-serif-luxury text-[var(--color-text-light)] uppercase tracking-wide">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gold/30"></div>
      </div>
      
      <div className="px-2 md:px-6">
        {children}
      </div>
    </motion.section>
  );
}
