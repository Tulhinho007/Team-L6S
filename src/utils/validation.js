export const validate = (d) => {
  const e = {};
  if (!d.nome?.trim() || d.nome.trim().length < 3) e.nome = "Mínimo 3 caracteres.";
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "E-mail inválido.";
  if (!d.telefone || d.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido.";
  if (!d.local) e.local = "Selecione o local.";
  if (!d.mensalidade || isNaN(d.mensalidade) || Number(d.mensalidade) <= 0) e.mensalidade = "Valor inválido.";
  if (!d.diaVencimento || isNaN(d.diaVencimento) || Number(d.diaVencimento) < 1 || Number(d.diaVencimento) > 31) e.diaVencimento = "Dia inválido (1-31).";
  return e;
};

export default validate;
