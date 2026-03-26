import React from 'react';

export const Card = ({children, className = ""}) => (
  <div className={`bg-dark-card border border-dark-border rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

export default Card;
