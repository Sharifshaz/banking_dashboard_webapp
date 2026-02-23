import { cn } from "@/lib/utils";
import { Eye, EyeOff, Wifi } from "lucide-react";
import { useState } from "react";

interface CardVisualProps {
  card: any;
  className?: string;
}

export function CardVisual({ card, className }: CardVisualProps) {
  const [showNumber, setShowNumber] = useState(false);

  const toggleNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNumber(!showNumber);
    if (!showNumber) {
      setTimeout(() => setShowNumber(false), 30000); // Auto hide
    }
  };

  return (
    <div 
      className={cn(
        "relative aspect-[1.586/1] w-full rounded-2xl p-6 text-white shadow-xl overflow-hidden transition-transform hover:scale-[1.02] duration-300",
        "bg-gradient-to-br",
        card.theme,
        className
      )}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold tracking-tight text-lg">NovaPay</p>
            <p className="text-[10px] opacity-80 uppercase tracking-wider">{card.type}</p>
          </div>
          <Wifi className="h-6 w-6 rotate-90 opacity-80" />
        </div>

        <div className="flex items-center gap-4 my-auto">
          <div className="h-8 w-10 rounded bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-sm" />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <p className="font-mono text-xl tracking-widest shadow-black/10 drop-shadow-md">
                {showNumber 
                  ? `${card.number.padEnd(16, '•').match(/.{1,4}/g)?.join(' ')}` 
                  : `•••• •••• •••• ${card.number}`}
              </p>
              <button onClick={toggleNumber} className="opacity-70 hover:opacity-100 transition-opacity">
                {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] opacity-70 uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="font-medium tracking-wide">{card.holder}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-70 uppercase tracking-wider mb-0.5">Expires</p>
            <p className="font-medium tracking-wide">{card.expiry}</p>
          </div>
          <div className="text-2xl font-bold italic opacity-90">
            {card.network}
          </div>
        </div>
      </div>
    </div>
  );
}
