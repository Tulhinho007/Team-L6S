import React from 'react';
import { X } from 'lucide-react';

export const MHead = ({title, subtitle, onClose}) => (
  <div style={{
    padding: "20px 24px 16px",
    borderBottom: "1px solid #2e2e2e",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }}>
    <div>
      <h2 style={{color: "#fff", fontWeight: 700, fontSize: 16}}>{title}</h2>
      {subtitle && <p style={{color: "#666", fontSize: 12, marginTop: 3}}>{subtitle}</p>}
    </div>
    <button 
      onClick={onClose} 
      style={{
        background: "transparent",
        border: "none",
        color: "#555",
        cursor: "pointer",
        padding: 4,
        display: "flex"
      }}
    >
      <X size={17}/>
    </button>
  </div>
);

export default MHead;
