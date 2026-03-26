import React from 'react';

export const Logo = () => (
  <div className="flex items-center gap-3">
    <svg viewBox="0 0 44 44" width="36" height="36" className="w-9 h-9 sm:w-10 sm:h-10">
      <polygon points="22,2 42,16 42,38 22,42 2,38 2,16" fill="#F06523"/>
      <polygon points="22,6 38,18 38,36 22,40 6,36 6,18" fill="#1A1A1A"/>
      <text x="22" y="29" textAnchor="middle" fill="#F06523" fontWeight="bold" fontSize="14" fontFamily="'Barlow Condensed',sans-serif">L6S</text>
    </svg>
    <div>
      <div className="text-primary font-barlow-condensed font-black text-sm sm:text-base tracking-widest leading-tight">
        TEAM L6S
      </div>
      <div className="text-dark-text text-xs tracking-widest uppercase">
        Futevôlei
      </div>
    </div>
  </div>
);

export default Logo;
