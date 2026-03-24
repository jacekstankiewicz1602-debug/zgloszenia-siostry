import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type FormValues } from '../types';
import { FormSection } from './FormSection';
import { ContactSection } from './sections/ContactSection';
import { HealthSection } from './sections/HealthSection';
import { ConsentsSection } from './sections/ConsentsSection';
import { AdditionalSection } from './sections/AdditionalSection';
import { FooterSection } from './sections/FooterSection';

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm<FormValues>({
    defaultValues: {
      hasChronicConditions: false,
      hasAllergies: false,
      takesMedication: false,
      consentMedical: false,
      consentPhotos: false,
      consentActivities: false,
      campExperience: false,
      diet: 'Brak'
    }
  });

  const onSubmit = (data: FormValues) => {
    // Generate unique ID and timestamp
    const fullData = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('narnia-submissions');
      const submissions = existing ? JSON.parse(existing) : [];
      submissions.push(fullData);
      localStorage.setItem('narnia-submissions', JSON.stringify(submissions));
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Error saving submission:', e);
      alert('Wystąpił błąd podczas zapisywania formularza.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-24 animate-fade-in no-print">
        <div className="w-24 h-24 border border-gold rounded-full flex items-center justify-center mx-auto mb-8 text-gold shadow-[0_0_30px_rgba(197,160,89,0.2)]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-4xl font-serif-luxury text-gold mb-4 tracking-widest uppercase">Zgłoszenie Przyjęte</h2>
        <p className="text-[var(--color-text-light)]/80 text-lg mb-12 font-light">Twoja karta została pomyślnie zapisana w systemie.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-4 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-sm"
        >
          Wypełnij nową kartę
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormSection title="Dane Kontaktowe" number={1} delay={0.1}>
        <ContactSection register={register} errors={errors} />
      </FormSection>

      <FormSection title="Zdrowie i Bezpieczeństwo" number={2} delay={0.2}>
        <HealthSection register={register} errors={errors} watch={watch} setValue={setValue} />
      </FormSection>

      <FormSection title="Zgody i Pozwolenia" number={3} delay={0.3}>
        <ConsentsSection watch={watch} setValue={setValue} />
      </FormSection>

      <FormSection title="Informacje Dodatkowe" number={4} delay={0.4}>
        <AdditionalSection register={register} watch={watch} setValue={setValue} />
      </FormSection>

      <FooterSection />

      {/* ACTION BUTTONS (Hidden on print) */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 no-print">
        <button 
          type="button"
          onClick={handlePrint}
          className="w-full md:w-auto px-10 py-5 border border-gold/50 text-gold hover:bg-gold/10 transition-all duration-300 font-semibold uppercase tracking-[0.2em] text-sm shadow-luxury"
        >
          Drukuj Kartę
        </button>
        
        <button 
          type="submit"
          className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#c5a059] to-[#a38040] text-[var(--color-bg-dark)] hover:brightness-110 transition-all duration-300 font-semibold uppercase tracking-[0.2em] text-sm shadow-luxury"
        >
          Prześlij Zgłoszenie
        </button>
      </div>
    </form>
  );
}
