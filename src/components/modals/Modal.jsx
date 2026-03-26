import React from 'react';

export const Modal = ({children, onClose, width = 520}) => (
  <div 
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    }} 
    onClick={onClose}
  >
    <div 
      style={{
        background: "#242424",
        border: "1px solid #333",
        borderRadius: 14,
        width: "100%",
        maxWidth: width,
        maxHeight: "90vh",
        overflowY: "auto"
      }} 
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
