import { type UseFormRegister, type FieldErrors, type UseFormWatch, type UseFormSetValue } from 'react-hook-form';
import { type FormValues } from '../../types';
import { InteractiveToggle } from '../fields/InteractiveToggle';
import { motion } from 'framer-motion';

interface HealthSectionProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export function HealthSection({ register, errors, watch, setValue }: HealthSectionProps) {
  const dietaryOptions = ['Brak', 'Wegetariańska', 'Wegańska', 'Bezglutenowa', 'Bez laktozy', 'Inne'];
  const currentDiet = watch('diet') || 'Brak';

  return (
    <div className="space-y-8">
      <div className="space-y-4 max-w-2xl">
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">
          SCHORZENIA I CHOROBY PRZEWLEKŁE *
        </label>
        <InteractiveToggle 
          value={watch('hasChronicConditions') || false} 
          onChange={(val) => setValue('hasChronicConditions', val)} 
        />
        
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] pt-2 mb-2 tracking-wider">
          ALERGIE *
        </label>
        <InteractiveToggle 
          value={watch('hasAllergies') || false} 
          onChange={(val) => setValue('hasAllergies', val)} 
        />
        
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] pt-2 mb-2 tracking-wider">
          PRZYJMOWANE LEKI *
        </label>
        <InteractiveToggle 
          value={watch('takesMedication') || false} 
          onChange={(val) => setValue('takesMedication', val)} 
        />
        
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] pt-2 mb-2 tracking-wider">
          SPECJALNE POTRZEBY / NIEPEŁNOSPRAWNOŚĆ
        </label>
        <input 
          type="text"
          {...register('specialNeeds')}
          className="w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)]"
          placeholder="Jeśli brak, pozostaw puste lub wpisz 'Brak'"
        />
      </div>

      <div className="pt-4 border-t border-gold/10">
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-4 tracking-wider">WYMAGANIA DIETETYCZNE</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {dietaryOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue('diet', opt)}
              className={`px-4 py-2 text-sm transition-all border ${
                currentDiet === opt 
                  ? 'bg-gold text-[var(--color-bg-dark)] border-gold shadow-md font-medium' 
                  : 'bg-transparent text-[var(--color-text-light)] border-gold/30 hover:border-gold'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {currentDiet === 'Inne' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">
              INNE WYMAGANIA DIETETYCZNE – SZCZEGÓŁY
            </label>
            <textarea 
              {...register('dietDetails', { required: currentDiet === 'Inne' ? 'Opisz szczegóły diety' : false })}
              className={`w-full bg-transparent border-b-2 ${errors.dietDetails ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)] min-h-[60px] resize-y`}
              placeholder="Opisz jeśli zaznaczyłeś/aś „Inne”"
            />
            {errors.dietDetails && <span className="text-red-500 text-xs mt-1 block">{errors.dietDetails.message}</span>}
          </motion.div>
        )}
      </div>
    </div>
  );
}
