import React from 'react';
import { X } from 'lucide-react';

export const MHead = ({title, subtitle, onClose}) => (
  <div className="px-6 py-5 border-b border-dark-border flex justify-between items-start gap-4">
    <div className="flex-1 min-w-0">
      <h2 className="text-white font-bold text-base sm:text-lg">{title}</h2>
      {subtitle && <p className="text-dark-text text-xs sm:text-sm mt-1 truncate">{subtitle}</p>}
    </div>
    <button 
      onClick={onClose} 
      className="text-dark-text hover:text-white transition-colors p-1 flex-shrink-0"
    >
      <X size={18}/>
    </button>
  </div>
);

export default MHead;
