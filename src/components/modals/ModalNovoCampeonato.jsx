import React, { useState } from 'react';
import { Modal } from './Modal';
import { MHead } from './MHead';

const inputClass = (err) => `w-full bg-dark-input border ${err ? 'border-red-500' : 'border-dark-border'} rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary transition-colors`;

export const ModalNovoCampeonato = ({ onSave, onClose }) => {
  const [form, setForm] = useState({
    nome: "",
    data: "",
    local: "Arena Clécio",
    status: "inscricoes"
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
      ...form,
      id: Date.now(),
      chaves: {}
    });
    onClose();
  };

  return (
    <Modal onClose={onClose} width={500}>
      <MHead title="Novo Campeonato" onClose={onClose}/>
      <div className="p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
              Nome do Campeonato
            </label>
            <input 
              type="text" 
              value={form.nome} 
              onChange={e => set("nome", e.target.value)} 
              placeholder="Ex: L6S Cup 2026"
              className={inputClass(erros.nome)}
            />
            {erros.nome && <p className="text-red-400 text-xs mt-1">{erros.nome}</p>}
          </div>

          <div>
            <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
              Data
            </label>
            <input 
              type="text" 
              value={form.data} 
              onChange={e => set("data", e.target.value)} 
              placeholder="Ex: 15-17 Mar 2026"
              className={inputClass(erros.data)}
            />
            {erros.data && <p className="text-red-400 text-xs mt-1">{erros.data}</p>}
          </div>

          <div>
            <label className="text-dark-text text-xs uppercase tracking-wide block mb-2">
              Local
            </label>
            <select 
              value={form.local} 
              onChange={e => set("local", e.target.value)} 
              className={inputClass()}
            >
              <option value="Arena Clécio">Arena Clécio</option>
              <option value="Prainha ZN">Prainha ZN</option>
              <option value="Prainha ZS">Prainha ZS</option>
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
              <option value="inscricoes">Inscrições Abertas</option>
              <option value="encerrado">Encerrado</option>
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
            Criar Campeonato
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNovoCampeonato;
