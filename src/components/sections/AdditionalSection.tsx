import { type UseFormRegister, type UseFormWatch, type UseFormSetValue, type FieldErrors } from 'react-hook-form';
import { type FormValues } from '../../types';
import { InteractiveToggle } from '../fields/InteractiveToggle';

interface AdditionalSectionProps {
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  errors: FieldErrors<FormValues>;
}

export function AdditionalSection({ register, watch, setValue, errors }: AdditionalSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">
          DLACZEGO CHCESZ UCZESTNICZYĆ W SPOTKANIU? *
        </label>
        <textarea 
          {...register('reasonToAttend', { required: 'To pole jest wymagane' })}
          className={`w-full bg-transparent border-b-2 ${errors.reasonToAttend ? 'border-red-500' : 'border-gold/20'} px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)] min-h-[80px] resize-y`}
          placeholder="Napisz kilka słów o swojej motywacji..."
        />
        {errors.reasonToAttend && <span className="text-red-500 text-xs mt-1 block">{errors.reasonToAttend.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-4 tracking-wider">ROZMIAR KOSZULKI</label>
          <div className="relative">
            <select
              {...register('tShirtSize')}
              className="w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)] appearance-none cursor-pointer"
            >
              <option value="" className="text-black">Wybierz rozmiar</option>
              <option value="XS" className="text-black">XS</option>
              <option value="S" className="text-black">S</option>
              <option value="M" className="text-black">M</option>
              <option value="L" className="text-black">L</option>
              <option value="XL" className="text-black">XL</option>
              <option value="XXL" className="text-black">XXL</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gold">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-4 tracking-wider">
            WCZEŚNIEJSZE DOŚWIADCZENIE OBOZOWE / REKOLEKCYJNE
          </label>
          <InteractiveToggle 
            value={watch('campExperience') || false} 
            onChange={(val) => setValue('campExperience', val)} 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2 tracking-wider">
          UWAGI I DODATKOWE INFORMACJE
        </label>
        <p className="text-xs text-[var(--color-text-muted)]/70 mb-3">
          Wszystko, co uważasz za ważne w kontekście uczestnictwa (np. strachy, przyzwyczajenia, trudności).
        </p>
        <textarea 
          {...register('notes')}
          className="w-full bg-transparent border-b-2 border-gold/20 px-2 py-2 focus:outline-none focus:border-gold transition-colors text-[var(--color-text-light)] min-h-[80px] resize-y"
          placeholder="Twoje uwagi..."
        />
      </div>
    </div>
  );
}
