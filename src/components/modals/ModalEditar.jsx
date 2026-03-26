import React, { useState } from 'react';
import { Modal } from './Modal';
import { MHead } from './MHead';
import { validate } from '../../utils';

const inputClass = (err) => `w-full bg-dark-input border ${err ? 'border-red-500' : 'border-dark-border'} rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary transition-colors`;

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
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[ 
            ["nome", "Nome Completo", "text"],
            ["email", "E-mail", "email"],
            ["telefone", "Telefone", "text"],
            ["mensalidade", "Mensalidade (R$)", "number"],
            ["diaVencimento", "Dia de Vencimento", "number"]
          ].map(([k, label, type]) => (
            <div key={k}>
              <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
                {label}
              </label>
              <input 
                type={type} 
                value={form[k]} 
                onChange={e => set(k, e.target.value)} 
                className={inputClass(erros[k])}
              />
              {erros[k] && <p className="text-red-400 text-xs mt-1">{erros[k]}</p>}
            </div>
          ))}
          <div>
            <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
              Local
            </label>
            <select 
              value={form.local} 
              onChange={e => set("local", e.target.value)} 
              className={inputClass()}
            >
              {["Prainha ZN", "Prainha ZS", "Arena Clécio"].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
              Status
            </label>
            <select 
              value={form.status} 
              onChange={e => set("status", e.target.value)} 
              className={inputClass()}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto bg-transparent border border-dark-border text-dark-text rounded-lg px-4 py-2 text-sm font-medium hover:border-primary hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={salvar} 
            className="w-full sm:w-auto bg-primary text-white rounded-lg px-6 py-2 text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditar;
