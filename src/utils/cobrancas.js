export const gerarCobrancas = (alunos) => {
  const hoje = new Date();
  const cobrancas = [];
  
  alunos.forEach(aluno => {
    if (aluno.status !== "ativo") return;
    
    const inicio = new Date(hoje.getFullYear() - 1, hoje.getMonth(), 1);
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 2, 0);
    
    for (let d = new Date(inicio); d <= fim; d.setMonth(d.getMonth() + 1)) {
      const ano = d.getFullYear();
      const mes = String(d.getMonth() + 1).padStart(2, "0");
      const mesRef = `${ano}-${mes}`;
      const diaVencimento = Math.min(aluno.diaVencimento, new Date(ano, d.getMonth() + 1, 0).getDate());
      const dataVencimento = `${ano}-${mes}-${String(diaVencimento).padStart(2, "0")}`;
      
      const pago = aluno.pagamentos?.[mesRef]?.pago || false;
      const dataPagamento = aluno.pagamentos?.[mesRef]?.dataPagamento || null;
      
      let status = "pendente";
      if (pago) status = "pago";
      else if (new Date(dataVencimento) < hoje) status = "vencido";
      
      cobrancas.push({
        id: `${aluno.id}-${mesRef}`,
        alunoId: aluno.id,
        alunoNome: aluno.nome,
        mesRef,
        mesLabel: `${mes}/${ano}`,
        valor: aluno.mensalidade,
        status,
        pago,
        dataVencimento,
        dataPagamento
      });
    }
  });
  
  return cobrancas;
};

export default gerarCobrancas;
