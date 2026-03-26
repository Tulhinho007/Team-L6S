import React from 'react';

export const Card = ({children, style = {}}) => (
  <div style={{
    background: "#242424",
    border: "1px solid #2e2e2e",
    borderRadius: 12,
    padding: 24,
    ...style
  }}>
    {children}
  </div>
);

export default Card;
