import React from 'react';
import { Card } from './Card';

export const StatCard = ({icon: Icon, label, value, sub, color = "#F06523"}) => (
  <Card className="flex flex-row items-center gap-4">
    <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style={{background: `${color}18`}}>
      <Icon size={20} color={color}/>
    </div>
    <div className="flex-1 text-left">
      <div className="text-xs text-dark-text uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold text-white">
        {value}
      </div>
      {sub && <div className="text-xs mt-1" style={{color}}>
        {sub}
      </div>}
    </div>
  </Card>
);

export default StatCard;
