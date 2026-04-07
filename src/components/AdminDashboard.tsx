import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type FormValues } from '../types';
import { supabase } from '../lib/supabase';
import { generateRegistrationPDF } from '../utils/pdfGenerator';
import { Download, Printer, ChevronDown, ChevronUp, Mail, Phone, Loader2 } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onToggleView: () => void;
}

export function AdminDashboard({ onLogout, onToggleView }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<FormValues[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (e) {
      console.error('Błąd wczytywania bazy zgłoszeń', e);
      alert('Błąd podczas pobierania danych z bazy Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć WSZYSTKIE zgłoszenia z systemu? Tej operacji nie można cofnąć.')) {
      try {
        const { error } = await supabase
          .from('submissions')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all works with a filter that matches everything

        if (error) throw error;
        setSubmissions([]);
      } catch (e) {
        console.error('Błąd podczas czyszczenia bazy', e);
        alert('Wystąpił błąd podczas usuwania danych.');
      }
    }
  };

  const handlePrintAll = () => {
    window.print();
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--color-bg-dark)] border border-gold/20 p-2 md:p-6 shadow-luxury min-h-[500px]"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 border-b border-gold/20 pb-6 gap-6 no-print">
        <div>
          <h2 className="text-3xl font-serif-luxury text-gold uppercase tracking-widest">Baza Zgłoszeń</h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-2">Ilość zarejestrowanych osób: {submissions.length}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handlePrintAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-gold/10 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all font-semibold uppercase tracking-wider text-xs"
          >
            <Printer size={16} />
            Drukuj Wszystko
          </button>
          <button 
            onClick={onToggleView}
            className="px-4 py-2.5 border border-gold/30 text-gold/70 hover:text-gold hover:bg-gold/5 transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wróć do Formularza
          </button>
          <button 
            onClick={handleClearDatabase}
            className="px-4 py-2.5 border border-red-900/40 text-red-500/70 hover:text-red-500 hover:bg-red-900/10 transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wyczyść Bazę
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2.5 bg-[var(--color-bg-card)] border border-gray-600/50 text-gray-400 hover:border-gray-400 hover:text-white transition-all font-semibold uppercase tracking-wider text-xs"
          >
            Wyloguj
          </button>
        </div>
      </div>

      {/* Print Header (Visible only on print) */}
      <div className="hidden print:block mb-8 text-center border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase">Baza Zgłoszeń - Narnia</h1>
        <p className="text-sm">Data wygenerowania: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
        <p className="text-sm font-bold mt-2">Łączna liczba osób: {submissions.length}</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-gold space-y-4">
          <Loader2 className="animate-spin" size={48} />
          <p className="text-sm uppercase tracking-widest font-medium animate-pulse">Pobieranie danych...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)] border border-dashed border-gold/10">
          <p className="text-lg">Brak zgłoszeń w bazie.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-gold/20 text-gold text-[10px] uppercase tracking-widest print:text-black print:border-black">
                <th className="py-4 px-2 font-semibold">Imię i Nazwisko</th>
                <th className="py-4 px-2 font-semibold">Kontakt</th>
                <th className="py-4 px-2 font-semibold">Dieta / Rozmiar</th>
                <th className="py-4 px-2 font-semibold print:hidden">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <React.Fragment key={sub.id}>
                  <tr className="border-b border-gold/10 hover:bg-gold/5 transition-colors text-[var(--color-text-light)] print:text-black print:border-black">
                    <td className="py-4 px-2">
                      <div className="font-bold text-base print:text-sm">
                        {sub.firstName || '?'} {sub.lastName || '?'}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)] mt-1 print:text-black">
                        Zgłoszono: {new Date(sub.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2 text-sm mb-1">
                        <Phone size={12} className="text-gold print:text-black" />
                        <span>{sub.participantPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm opacity-70">
                        <Mail size={12} className="text-gold print:text-black" />
                        <span className="truncate max-w-[150px]">{sub.email || '-'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">Dieta: <span className="font-semibold">{sub.diet}</span></div>
                      <div className="text-sm">Koszulka: <span className="font-bold text-gold print:text-black">{sub.tShirtSize || '-'}</span></div>
                    </td>
                    <td className="py-4 px-2 print:hidden">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => generateRegistrationPDF(sub)}
                          className="p-2 text-gold border border-gold/30 hover:bg-gold hover:text-black transition-colors rounded-sm"
                          title="Pobierz PDF"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={() => toggleExpand(sub.id)}
                          className={`p-2 border transition-all rounded-sm ${expandedId === sub.id ? 'bg-gold text-black border-gold' : 'text-gold border-gold/30 hover:bg-gold/10'}`}
                          title="Szczegóły"
                        >
                          {expandedId === sub.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expandable row with ALL personal info */}
                  <AnimatePresence>
                    {expandedId === sub.id && (
                      <motion.tr 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gold/5 border-b border-gold/20 print:hidden"
                      >
                        <td colSpan={4} className="py-6 px-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gold uppercase tracking-tighter border-b border-gold/20 pb-2">Informacje Osobiste</h4>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Adres:</span> <br/>{sub.address || '-'}</p>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Tel. Rodzica:</span> <br/>{sub.parentPhone || '-'}</p>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Kontakt Alarmowy:</span> <br/>{sub.emergencyName} ({sub.emergencyPhone})</p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gold uppercase tracking-tighter border-b border-gold/20 pb-2">Zdrowie i Potrzeby</h4>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Choroby / Alergie:</span> <br/>
                                {sub.hasChronicConditions ? '⚠️ Choroby ' : ''}
                                {sub.hasAllergies ? '⚠️ Alergie ' : ''}
                                {sub.takesMedication ? '💊 Leki ' : ''}
                                {!sub.hasChronicConditions && !sub.hasAllergies && !sub.takesMedication ? 'Brak uwag' : ''}
                              </p>
                              {sub.dietDetails && <p className="text-sm"><span className="text-[var(--color-text-muted)]">Detale diety:</span> <br/>{sub.dietDetails}</p>}
                              {sub.specialNeeds && <p className="text-sm"><span className="text-[var(--color-text-muted)]">Specjalne potrzeby:</span> <br/>{sub.specialNeeds}</p>}
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-gold uppercase tracking-tighter border-b border-gold/20 pb-2">Inne</h4>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Doświadczenie:</span> <br/>{sub.campExperience ? 'Był już na obozie' : 'Pierwszy raz'}</p>
                              <p className="text-sm"><span className="text-[var(--color-text-muted)]">Motywacja:</span> <br/>{sub.reasonToAttend}</p>
                              {sub.notes && <p className="text-sm"><span className="text-[var(--color-text-muted)]">Uwagi:</span> <br/>{sub.notes}</p>}
                              <div className="flex gap-2 flex-wrap pt-2">
                                <span className={`px-2 py-0.5 text-[10px] rounded-full border ${sub.consentMedical ? 'border-green-500/50 text-green-500' : 'border-red-500/50 text-red-500'}`}>Medyczna</span>
                                <span className={`px-2 py-0.5 text-[10px] rounded-full border ${sub.consentPhotos ? 'border-green-500/50 text-green-500' : 'border-red-500/50 text-red-500'}`}>Foto</span>
                                <span className={`px-2 py-0.5 text-[10px] rounded-full border ${sub.consentActivities ? 'border-green-500/50 text-green-500' : 'border-red-500/50 text-red-500'}`}>Zajęcia</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
