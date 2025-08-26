// import { Sun } from 'lucide-react'; // ← Dejo esto comentado para evitar "unused import"
import React from 'react';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      {/* Reemplazo TEMPORAL del sol girando por el logo en PNG */}
      <Image
        src="/logo_mc_solar_sin_fondo.png"
        alt="GRUPO MC SOLAR"
        width={32}
        height={32}
        className="h-8 w-8"
        priority
      />

      {/* --- CÓDIGO ORIGINAL (guardado para después) ---
      <Sun className="h-8 w-8 animate-spin-slow" />
      ------------------------------------------------- */}

      <span className="text-2xl font-bold text-white font-headline">GRUPO MC SOLAR</span>
    </div>
  );
}

