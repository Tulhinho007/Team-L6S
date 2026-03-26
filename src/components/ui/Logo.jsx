import React from 'react';

export const Logo = () => (
  <div style={{display:"flex",alignItems:"center",gap:12}}>
    <svg viewBox="0 0 44 44" width="40" height="40">
      <polygon points="22,2 42,16 42,38 22,42 2,38 2,16" fill="#F06523"/>
      <polygon points="22,6 38,18 38,36 22,40 6,36 6,18" fill="#1A1A1A"/>
      <text x="22" y="29" textAnchor="middle" fill="#F06523" fontWeight="bold" fontSize="14" fontFamily="'Barlow Condensed',sans-serif">L6S</text>
    </svg>
    <div>
      <div style={{color:"#F06523",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:17,letterSpacing:2,lineHeight:1}}>TEAM L6S</div>
      <div style={{color:"#555",fontSize:9,letterSpacing:3,textTransform:"uppercase"}}>Futevôlei</div>
    </div>
  </div>
);

export default Logo;
