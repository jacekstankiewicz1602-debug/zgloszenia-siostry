import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type FormValues } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onToggleView: () => void;
}

export function AdminDashboard({ onLogout, onToggleView }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<FormValues[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('narnia-submissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Błąd wczytywania bazy zgłoszeń', e);
    }
  }, []);

  const handleClearDatabase = () => {
    if (window.confirm('Czy na pewno chcesz usunąć WSZYSTKIE zgłoszenia z systemu? Tej operacji nie można cofnąć.')) {
      localStorage.removeItem('narnia-submissions');
      setSubmissions([]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-bg-dark)] border border-gold/20 p-6 shadow-luxury min-h-[500px]"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gold/20 pb-6 gap-6">
        <div>
          <h2 className="text-3xl font-serif-luxury text-gold uppercase tracking-widest">Baza Zgłoszeń</h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-2">Ilość zarejestrowanych osób: {submissions.length}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onToggleView}
            className="px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wróć do Formularza
          </button>
          <button 
            onClick={handleClearDatabase}
            className="px-6 py-3 border border-red-900/50 text-red-500 hover:bg-red-900/20 transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wyczyść Bazę
          </button>
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-[var(--color-bg-card)] border border-gray-600/50 text-gray-400 hover:border-gray-400 hover:text-white transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wyloguj Się
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)] border border-dashed border-gold/10">
          <p className="text-lg">Brak zgłoszeń w bazie.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gold/20 text-gold text-xs uppercase tracking-widest">
                <th className="py-4 px-4 font-semibold">Data Rejestracji</th>
                <th className="py-4 px-4 font-semibold">N/A / Opcje</th>
                <th className="py-4 px-4 font-semibold">Telefon Uczestnika</th>
                <th className="py-4 px-4 font-semibold">Dieta</th>
                <th className="py-4 px-4 font-semibold">Koszulka</th>
                <th className="py-4 px-4 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors text-[var(--color-text-light)]">
                  <td className="py-3 px-4 text-sm whitespace-nowrap text-[var(--color-text-muted)]">
                    {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {sub.emergencyName ? "+" : "-"}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{sub.participantPhone}</td>
                  <td className="py-3 px-4 text-sm">{sub.diet}</td>
                  <td className="py-3 px-4 text-sm font-bold text-gold">{sub.tShirtSize || '-'}</td>
                  <td className="py-3 px-4 text-sm text-[var(--color-text-muted)]">{sub.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
