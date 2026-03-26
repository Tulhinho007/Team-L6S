import React, { useState } from 'react';
import { Modal } from './Modal';
import { MHead } from './MHead';

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

export const ModalEditarCampeonato = ({ campeonato, onSave, onClose }) => {
  const [form, setForm] = useState({
    nome: campeonato.nome,
    data: campeonato.data,
    local: campeonato.local,
    status: campeonato.status
  });
  const [erros, setErros] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErros(e => ({ ...e, [k]: undefined }));
  };

  const salvar = () => {
    const e = {};
    if (!form.nome?.trim() || form.nome.trim().length < 3) e.nome = "Mínimo 3 caracteres.";
    if (!form.data?.trim()) e.data = "Data é obrigatória.";
    
    if (Object.keys(e).length) {
      setErros(e);
      return;
    }
    
    onSave({
      ...campeonato,
      ...form
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} width={500}>
      <MHead title="Editar Campeonato" subtitle={campeonato.nome} onClose={onClose}/>
      <div style={{padding: 24}}>
        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <div>
            <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
              Nome do Campeonato
            </label>
            <input 
              type="text" 
              value={form.nome} 
              onChange={e => set("nome", e.target.value)} 
              style={iSt(erros.nome)}
            />
            {erros.nome && <p style={{color: "#ef4444", fontSize: 11, marginTop: 3}}>{erros.nome}</p>}
          </div>

          <div>
            <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
              Data
            </label>
            <input 
              type="text" 
              value={form.data} 
              onChange={e => set("data", e.target.value)} 
              style={iSt(erros.data)}
            />
            {erros.data && <p style={{color: "#ef4444", fontSize: 11, marginTop: 3}}>{erros.data}</p>}
          </div>

          <div>
            <label style={{color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5}}>
              Local
            </label>
            <select 
              value={form.local} 
              onChange={e => set("local", e.target.value)} 
              style={{...iSt(), appearance: "none"}}
            >
              <option value="Arena Clécio">Arena Clécio</option>
              <option value="Prainha ZN">Prainha ZN</option>
              <option value="Prainha ZS">Prainha ZS</option>
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
              <option value="inscricoes">Inscrições Abertas</option>
              <option value="encerrado">Encerrado</option>
            </select>
          </div>
        </div>

        <div style={{display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end"}}>
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

export default ModalEditarCampeonato;
