import React from 'react';
import { Card } from './Card';

export const StatCard = ({icon: Icon, label, value, sub, color = "#F06523"}) => (
  <Card style={{display: "flex", alignItems: "center", gap: 16}}>
    <div style={{
      width: 48,
      height: 48,
      borderRadius: 12,
      background: `${color}18`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }}>
      <Icon size={20} color={color}/>
    </div>
    <div>
      <div style={{
        color: "#666",
        fontSize: 11,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 3
      }}>
        {label}
      </div>
      <div style={{
        color: "#fff",
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 1
      }}>
        {value}
      </div>
      {sub && <div style={{color, fontSize: 11, marginTop: 3}}>{sub}</div>}
    </div>
  </Card>
);

export default StatCard;
