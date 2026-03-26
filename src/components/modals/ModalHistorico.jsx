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
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-dark-input rounded-lg p-3">
            <div className="text-dark-text text-xs uppercase tracking-wide mb-2">Total Pago</div>
            <div className="text-green-400 font-bold text-xl">
              R$ {totalPago.toLocaleString("pt-BR")}
            </div>
          </div>
          <div className="bg-dark-input rounded-lg p-3">
            <div className="text-dark-text text-xs uppercase tracking-wide mb-2">Mensalidade</div>
            <div className="text-primary font-bold text-xl">
              R$ {aluno.mensalidade}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {hist.map((c, i) => (
            <div 
              key={c.id} 
              className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-3 border-b border-dark-border last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  c.pago ? 'bg-green-400' : c.status === 'vencido' ? 'bg-red-400' : 'bg-yellow-400'
                }`}/>
                <div className="min-w-0">
                  <div className="text-white font-semibold text-sm">{c.mesLabel}</div>
                  <div className="text-dark-text text-xs mt-1">
                    {c.dataPagamento
                      ? `Pago em ${new Date(c.dataPagamento).toLocaleDateString("pt-BR")}`
                      : `Vence dia ${aluno.diaVencimento}`
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className={`font-bold text-sm ${c.pago ? 'text-green-400' : 'text-dark-text'}`}>
                  R$ {c.valor}
                </span>
                <Badge status={c.status}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalHistorico;
