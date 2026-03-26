export const MOCK_ALUNOS_INICIAL = [
  { 
    id: 1, 
    nome: "Carlos Silva",  
    email: "carlos@email.com",  
    telefone: "(81) 99999-1111", 
    local: "Prainha ZN",   
    status: "ativo",   
    mensalidade: 180, 
    diaVencimento: 5,  
    pagamentos: {
      "2026-02": { pago: true, dataPagamento: "2026-02-04" },
      "2026-03": { pago: true, dataPagamento: "2026-03-04" },
      "2026-04": { pago: true, dataPagamento: "2026-04-04" }
    } 
  },
  { 
    id: 2, 
    nome: "Ana Ferreira",  
    email: "ana@email.com",     
    telefone: "(81) 99999-2222", 
    local: "Prainha ZS",   
    status: "ativo",   
    mensalidade: 180, 
    diaVencimento: 10, 
    pagamentos: {
      "2026-02": { pago: true, dataPagamento: "2026-02-09" },
      "2026-03": { pago: true, dataPagamento: "2026-03-09" }
    } 
  },
  { 
    id: 3, 
    nome: "Bruno Costa",   
    email: "bruno@email.com",   
    telefone: "(81) 99999-3333", 
    local: "Arena Clécio", 
    status: "inativo", 
    mensalidade: 200, 
    diaVencimento: 20, 
    pagamentos: {} 
  },
  { 
    id: 4, 
    nome: "Julia Mendes",  
    email: "julia@email.com",   
    telefone: "(81) 99999-4444", 
    local: "Prainha ZN",   
    status: "ativo",   
    mensalidade: 180, 
    diaVencimento: 15, 
    pagamentos: {
      "2026-02": { pago: true, dataPagamento: "2026-02-14" },
      "2026-03": { pago: true, dataPagamento: "2026-03-14" },
      "2026-04": { pago: true, dataPagamento: "2026-04-14" }
    } 
  }
];

export const MOCK_CAMPEONATOS = [
  {
    id: 1,
    nome: "L6S Cup 2026",
    data: "15-17 Mar 2026",
    local: "Arena Clécio",
    status: "inscricoes",
    chaves: {
      "A": [
        { time: "Team L6S A", pontos: 0 },
        { time: "Time Vermelho", pontos: 0 }
      ]
    }
  }
];
