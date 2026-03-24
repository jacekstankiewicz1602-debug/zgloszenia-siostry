


interface InteractiveToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function InteractiveToggle({ value, onChange }: InteractiveToggleProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`w-16 py-1.5 text-sm transition-all border ${
          value === true 
            ? 'bg-gold text-[#3d3028] border-gold font-bold shadow-sm' 
            : 'bg-transparent text-[#5c4a3d] border-[#3d3028]/30 hover:border-gold'
        }`}
      >
        TAK
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`w-16 py-1.5 text-sm transition-all border ${
          value === false 
            ? 'bg-[#3d3028] text-white border-[#3d3028] font-bold shadow-sm' 
            : 'bg-transparent text-[#5c4a3d] border-[#3d3028]/30 hover:border-[#3d3028]'
        }`}
      >
        NIE
      </button>
    </div>
  );
}
