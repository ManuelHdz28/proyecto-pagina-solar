import { Sun } from 'lucide-react';
import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-primary ${className}`}>
      <Sun className="h-8 w-8 animate-spin-slow" />
      <span className="text-2xl font-bold text-white font-headline">GRUPO MC SOLAR</span>
    </div>
  );
}
