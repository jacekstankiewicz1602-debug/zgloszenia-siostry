import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export function AdminLogin({ onLoginSuccess, onCancel }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'tyborska@o2.pl' && password === 'Marykarta1?') {
      onLoginSuccess();
    } else {
      setError('Nieprawidłowe dane logowania.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#2c241c] border border-gold/40 p-8 rounded-sm shadow-luxury w-full max-w-md relative"
      >
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-gold/60 hover:text-gold transition-colors"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif-luxury text-gold mb-6 text-center">
          Logowanie Administratora
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gold/80 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1c1611] border border-gold/20 rounded-none px-4 py-2 text-[#fdfaf6] focus:outline-none focus:border-gold/60 transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gold/80 mb-1">Hasło</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1c1611] border border-gold/20 rounded-none px-4 py-2 text-[#fdfaf6] focus:outline-none focus:border-gold/60 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gold/30 text-gold/80 hover:bg-gold/10 transition-colors text-sm uppercase tracking-wider"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#c5a059] to-[#a38040] text-[#1c1611] font-semibold hover:brightness-110 transition-all text-sm uppercase tracking-wider"
            >
              Zaloguj
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
