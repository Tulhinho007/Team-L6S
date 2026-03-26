import React from 'react';

export const Card = ({children, className = ""}) => (
  <div className={`bg-dark-card border border-dark-border rounded-xl p-4 w-full ${className}`}>
    {children}
  </div>
);

export default Card;
