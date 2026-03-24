import { type UseFormWatch, type UseFormSetValue } from 'react-hook-form';
import { type FormValues } from '../../types';
import { InteractiveToggle } from '../fields/InteractiveToggle';

interface ConsentsSectionProps {
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export function ConsentsSection({ watch, setValue }: ConsentsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 p-4 md:p-6 border border-gold/10 relative group hover:border-gold/30 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-gold/50 group-hover:bg-gold transition-colors"></div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gold mb-1">Zgoda na udzielenie pierwszej pomocy medycznej *</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Wyrażam zgodę na udzielenie uczestnikowi niezbędnej pomocy medycznej (w tym wezwanie pogotowia ratunkowego) w sytuacji zagrożenia zdrowia lub życia w trakcie trwania wydarzenia.
            </p>
          </div>
          <div className="shrink-0 mt-2 md:mt-0">
            <InteractiveToggle 
              value={watch('consentMedical') || false} 
              onChange={(val) => setValue('consentMedical', val)} 
            />
          </div>
        </div>
      </div>

      <div className="bg-black/20 p-4 md:p-6 border border-gold/10 relative group hover:border-gold/30 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-gold/50 group-hover:bg-gold transition-colors"></div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gold mb-1">Zgoda na publikację zdjęć i filmów</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Wyrażam zgodę na fotografowanie i filmowanie uczestnika podczas wydarzenia oraz na nieodpłatne i bezterminowe wykorzystanie tych materiałów przez Organizatora w celach promocyjnych.
            </p>
          </div>
          <div className="shrink-0 mt-2 md:mt-0">
            <InteractiveToggle 
              value={watch('consentPhotos') || false} 
              onChange={(val) => setValue('consentPhotos', val)} 
            />
          </div>
        </div>
      </div>

      <div className="bg-black/20 p-4 md:p-6 border border-gold/10 relative group hover:border-gold/30 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-gold/50 group-hover:bg-gold transition-colors"></div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gold mb-1">Zgoda na uczestnictwo we wszystkich aktywnościach *</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Wyrażam zgodę na udział uczestnika we wszystkich zaplanowanych zajęciach oraz oświadczam, że nie ma przeciwwskazań zdrowotnych do jego uczestnictwa w zajęciach ruchowych.
            </p>
          </div>
          <div className="shrink-0 mt-2 md:mt-0">
            <InteractiveToggle 
              value={watch('consentActivities') || false} 
              onChange={(val) => setValue('consentActivities', val)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
