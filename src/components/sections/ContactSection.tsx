import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type FormValues } from '../../types';

interface ContactSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

export function ContactSection({ register, errors }: ContactSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">IMIĘ UCZESTNIKA *</label>
          <input 
            type="text"
            {...register('firstName', { required: 'To pole jest wymagane' })}
            className={`w-full bg-transparent border-b-2 ${errors.firstName ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="Jan"
          />
          {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName.message}</span>}
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">NAZWISKO UCZESTNIKA *</label>
          <input 
            type="text"
            {...register('lastName', { required: 'To pole jest wymagane' })}
            className={`w-full bg-transparent border-b-2 ${errors.lastName ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="Kowalski"
          />
          {errors.lastName && <span className="text-red-500 text-xs mt-1 block">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">TELEFON UCZESTNIKA *</label>
          <input 
            type="tel"
            {...register('participantPhone', { required: 'To pole jest wymagane' })}
            className={`w-full bg-transparent border-b-2 ${errors.participantPhone ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="+48 000 000 000"
          />
          {errors.participantPhone && <span className="text-red-500 text-xs mt-1 block">{errors.participantPhone.message}</span>}
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">TELEFON RODZICA / OPIEKUNA</label>
          <input 
            type="tel"
            {...register('parentPhone')}
            className={`w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="+48 000 000 000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">KONTAKT ALARMOWY – IMIĘ I NAZWISKO *</label>
          <input 
            type="text"
            {...register('emergencyName', { required: 'To pole jest wymagane' })}
            className={`w-full bg-transparent border-b-2 ${errors.emergencyName ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="Jan Kowalski"
          />
          {errors.emergencyName && <span className="text-red-500 text-xs mt-1 block">{errors.emergencyName.message}</span>}
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">KONTAKT ALARMOWY – TELEFON *</label>
          <input 
            type="tel"
            {...register('emergencyPhone', { required: 'To pole jest wymagane' })}
            className={`w-full bg-transparent border-b-2 ${errors.emergencyPhone ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]`}
            placeholder="+48 000 000 000"
          />
          {errors.emergencyPhone && <span className="text-red-500 text-xs mt-1 block">{errors.emergencyPhone.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">ADRES E-MAIL</label>
          <input 
            type="email"
            {...register('email')}
            className="w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]"
            placeholder="adres@email.com"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">ADRES KORESPONDENCYJNY</label>
          <input 
            type="text"
            {...register('address')}
            className="w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]"
            placeholder="Ulica, kod pocztowy, miejscowość"
          />
        </div>
      </div>
    </div>
  );
}
