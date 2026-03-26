import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { MHead } from './MHead';

export const ModalExcluir = ({aluno, onConfirm, onClose}) => (
  <Modal onClose={onClose} width={400}>
    <MHead title="Excluir Aluno" onClose={onClose}/>
    <div style={{padding: 24}}>
      <div style={{
        background: "rgba(239,68,68,0.07)",
        border: "1px solid rgba(239,68,68,0.18)",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20
      }}>
        <p style={{color: "#ccc", fontSize: 14, marginBottom: 6}}>
          Excluir <strong style={{color: "#fff"}}>{aluno.nome}</strong>?
        </p>
        <p style={{color: "#666", fontSize: 12}}>
          Todo o histórico financeiro será removido. Esta ação não pode ser desfeita.
        </p>
      </div>
      <div style={{display: "flex", gap: 10, justifyContent: "flex-end"}}>
        <button 
          onClick={onClose} 
          style={{
            background: "transparent",
            border: "1px solid #333",
            color: "#888",
            borderRadius: 8,
            padding: "9px 18px",
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
        <button 
          onClick={onConfirm} 
          style={{
            background: "#ef4444",
            border: "none",
            color: "#fff",
            borderRadius: 8,
            padding: "9px 20px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6
          }}
        >
          <Trash2 size={13}/> Excluir
        </button>
      </div>
    </div>
  </Modal>
);

export default ModalExcluir;
