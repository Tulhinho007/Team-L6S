import React from 'react';

export const Badge = ({status}) => {
  const statusMap = {
    ativo: {bg: "bg-green-950", text: "text-green-400", label: "Ativo"},
    inativo: {bg: "bg-red-950", text: "text-red-400", label: "Inativo"},
    pago: {bg: "bg-green-950", text: "text-green-400", label: "Pago"},
    pendente: {bg: "bg-yellow-950", text: "text-yellow-400", label: "Pendente"},
    vencido: {bg: "bg-red-950", text: "text-red-400", label: "Vencido"},
    inscricoes: {bg: "bg-orange-950", text: "text-orange-400", label: "Inscrições"},
    encerrado: {bg: "bg-gray-700", text: "text-gray-400", label: "Encerrado"}
  };
  
  const config = statusMap[status] || statusMap.inativo;
  
  return (
    <span className={`${config.bg} ${config.text} px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap`}>
      {config.label}
    </span>
  );
};

export default Badge;
