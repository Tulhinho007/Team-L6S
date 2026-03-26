import React from 'react';
import { Modal } from './Modal';
import { MHead } from './MHead';
import { Badge } from '../ui/Badge';

export const ModalHistorico = ({aluno, cobrancas, onClose}) => {
  const hist = cobrancas.filter(c => c.alunoId === aluno.id).sort((a, b) => b.mesRef.localeCompare(a.mesRef));
  const totalPago = hist.filter(c => c.pago).reduce((s, c) => s + c.valor, 0);
  
  return (
    <Modal onClose={onClose} width={460}>
      <MHead title="Histórico de Pagamentos" subtitle={aluno.nome} onClose={onClose}/>
      <div style={{padding: 24}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20}}>
          <div style={{background: "#1e1e1e", borderRadius: 8, padding: 12}}>
            <div style={{color: "#555", fontSize: 11, marginBottom: 3}}>Total Pago (período)</div>
            <div style={{color: "#22c55e", fontWeight: 700, fontSize: 20}}>
              R$ {totalPago.toLocaleString("pt-BR")}
            </div>
          </div>
          <div style={{background: "#1e1e1e", borderRadius: 8, padding: 12}}>
            <div style={{color: "#555", fontSize: 11, marginBottom: 3}}>Mensalidade Atual</div>
            <div style={{color: "#F06523", fontWeight: 700, fontSize: 20}}>
              R$ {aluno.mensalidade}
            </div>
          </div>
        </div>
        
        {hist.map((c, i) => (
          <div 
            key={c.id} 
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: i < hist.length - 1 ? "1px solid #2a2a2a" : "none"
            }}
          >
            <div style={{display: "flex", alignItems: "center", gap: 12}}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: c.pago ? "#22c55e" : c.status === "vencido" ? "#ef4444" : "#eab308",
                flexShrink: 0
              }}/>
              <div>
                <div style={{color: "#fff", fontWeight: 600, fontSize: 13}}>{c.mesLabel}</div>
                <div style={{color: "#555", fontSize: 11, marginTop: 2}}>
                  {c.dataPagamento
                    ? `Pago em ${new Date(c.dataPagamento).toLocaleDateString("pt-BR")}`
                    : `Vence dia ${aluno.diaVencimento}`
                  }
                </div>
              </div>
            </div>
            <div style={{display: "flex", alignItems: "center", gap: 10}}>
              <span style={{color: c.pago ? "#22c55e" : "#888", fontWeight: 700, fontSize: 14}}>
                R$ {c.valor}
              </span>
              <Badge status={c.status}/>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalHistorico;
