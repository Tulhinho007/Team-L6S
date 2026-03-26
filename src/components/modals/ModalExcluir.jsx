import React from 'react';
import { Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { MHead } from './MHead';

export const ModalExcluir = ({aluno, onConfirm, onClose}) => (
  <Modal onClose={onClose} width={400}>
    <MHead title="Excluir Aluno" onClose={onClose}/>
    <div className="p-6">
      <div className="bg-red-950 border border-red-900 rounded-xl p-4 mb-6">
        <p className="text-gray-200 text-sm mb-2">
          Excluir <strong className="text-white">{aluno.nome}</strong>?
        </p>
        <p className="text-dark-text text-xs">
          Todo o histórico financeiro será removido. Esta ação não pode ser desfeita.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button 
          onClick={onClose} 
          className="w-full sm:w-auto bg-transparent border border-dark-border text-dark-text rounded-lg px-4 py-2 text-sm font-medium hover:border-primary hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={onConfirm} 
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <Trash2 size={14}/> Excluir
        </button>
      </div>
    </div>
  </Modal>
);

export default ModalExcluir;
