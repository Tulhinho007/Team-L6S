import React from 'react';

export const Card = ({children, className = ""}) => (
  <div className={`bg-dark-card border border-dark-border rounded-xl p-3 sm:p-4 lg:p-6 w-full ${className}`}>
    {children}
  </div>
);

export default Card;
