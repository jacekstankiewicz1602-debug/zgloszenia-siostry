
export function FooterSection() {
  return (
    <div className="mt-16 pt-12 border-t border-gold/20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-bg-card)] px-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold opacity-80">
          <path d="M12 2v20M5 8h14" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-8">
        <div>
          <div className="border-b border-[var(--color-text-muted)] border-dashed pt-8"></div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-2 tracking-widest uppercase">Miejscowość i data</p>
        </div>
        <div className="hidden md:block"></div>

        <div>
          <div className="border-b border-[var(--color-text-muted)] border-dashed pt-8"></div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-2 tracking-widest uppercase">Podpis uczestnika</p>
        </div>

        <div>
          <div className="border-b border-[var(--color-text-muted)] border-dashed pt-8"></div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-2 tracking-widest uppercase">Podpis rodzica / opiekuna</p>
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <div className="w-64">
          <div className="border border-gold/50 w-24 h-24 mx-auto rounded-full flex items-center justify-center relative shadow-[0_0_15px_rgba(197,160,89,0.1)]">
            <span className="text-[10px] text-gold/80 uppercase tracking-widest text-center leading-loose">Miejsce<br/>na<br/>pieczęć</span>
            <div className="absolute -bottom-4 bg-[var(--color-bg-card)] px-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Organizator</span>
            </div>
          </div>
          <div className="border-b border-[var(--color-text-muted)] border-dashed pt-12"></div>
        </div>
      </div>
    </div>
  );
}
