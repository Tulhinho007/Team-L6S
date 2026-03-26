import React from 'react';

export const Badge = ({status}) => {
  const m = {
    ativo: {bg: "rgba(34,197,94,0.15)", c: "#22c55e", l: "Ativo"},
    inativo: {bg: "rgba(239,68,68,0.15)", c: "#ef4444", l: "Inativo"},
    pago: {bg: "rgba(34,197,94,0.15)", c: "#22c55e", l: "Pago"},
    pendente: {bg: "rgba(234,179,8,0.15)", c: "#eab308", l: "Pendente"},
    vencido: {bg: "rgba(239,68,68,0.15)", c: "#ef4444", l: "Vencido"},
    inscricoes: {bg: "rgba(240,101,35,0.15)", c: "#F06523", l: "Inscrições"},
    encerrado: {bg: "rgba(107,114,128,0.15)", c: "#9ca3af", l: "Encerrado"}
  };
  const s = m[status] || m.inativo;
  return (
    <span style={{
      background: s.bg,
      color: s.c,
      padding: "3px 9px",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }}>
      {s.l}
    </span>
  );
};

export default Badge;
