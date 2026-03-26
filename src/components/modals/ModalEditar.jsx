import React, { useState } from 'react';
import { Modal } from './Modal';
import { MHead } from './MHead';
import { validate } from '../../utils';

const iSt = (err) => ({
  width: "100%",
  background: "#1e1e1e",
  border: `1px solid ${err ? "#ef4444" : "#333"}`,
  borderRadius: 8,
  padding: "9px 12px",
  color: "#fff",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box"
});

export const ModalEditar = ({aluno, onSave, onClose}) => {
  const [form, setForm] = useState({
    nome: aluno.nome,
    email: aluno.email,
    telefone: aluno.telefone,
    local: aluno.local,
    mensalidade: aluno.mensalidade,
    diaVencimento: aluno.diaVencimento,
    status: aluno.status
  });
  const [erros, setErros] = useState({});
  
  const set = (k, v) => {
    setForm(f => ({...f, [k]: v}));
    setErros(e => ({...e, [k]: undefined}));
  };
  
  const salvar = () => {
    const e = validate(form);
    if (Object.keys(e).length) {
      setErros(e);
      return;
    }
    onSave({
      ...aluno,
      ...form,
      mensalidade: Number(form.mensalidade),
      diaVencimento: Number(form.diaVencimento)
    });
  };

  return (
    <Modal onClose={onClose}>
      <MHead title="Editar Aluno" subtitle={aluno.nome} onClose={onClose}/>
      <div style={{padding: 24}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
          {[ ["nome", "Nome Completo", "text"],
            ["email", "E-mail", "email"],
            ["telefone", "Telefone", "text"],
            ["mensalidade", "Mensalidade (R$)", "number"],
            ["diaVencimento", "Dia de Vencimento", "number"]
          ].map(([k, label, type]) => (
            <div key={k}>
              <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
                {label}
              </label>
              <input 
                type={type} 
                value={form[k]} 
                onChange={e => set(k, e.target.value)} 
                style={iSt(erros[k])}
              />
              {erros[k] && <p style={{color: "#ef4444", fontSize: 11, marginTop: 3}}>{erros[k]}</p>}
            </div>
          ))}
          <div>
            <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
              Local
            </label>
            <select 
              value={form.local} 
              onChange={e => set("local", e.target.value)} 
              style={{...iSt(erros.local), appearance: "none"}}
            >
              {["Prainha ZN", "Prainha ZS", "Arena Clécio"].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
              Status
            </label>
            <select 
              value={form.status} 
              onChange={e => set("status", e.target.value)} 
              style={{...iSt(), appearance: "none"}}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
        <div style={{display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end"}}>
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
            onClick={salvar} 
            style={{
              background: "#F06523",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              padding: "9px 22px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditar;
