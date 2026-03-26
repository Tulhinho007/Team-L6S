import React from 'react';

export const Modal = ({children, onClose, width = 520}) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div 
      className="bg-dark-card border border-dark-border rounded-2xl w-full max-h-[90vh] overflow-y-auto"
      style={{maxWidth: width}}
      onClick={e => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
