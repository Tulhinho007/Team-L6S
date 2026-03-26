import React, { useState } from 'react';
import { Bell, LayoutDashboard, Users, DollarSign, Trophy, Dumbbell } from 'lucide-react';

// UI Components
import { Logo, Badge, Card, StatCard } from './components/ui';

// Modal Components
import { ModalEditar, ModalExcluir, ModalHistorico, ModalNovoCampeonato, ModalEditarCampeonato } from './components/modals';

// Utilities
import { validate, gerarCobrancas, MESES } from './utils';

// Data
import { MOCK_ALUNOS_INICIAL, MOCK_CAMPEONATOS } from './data';

// Estilos de input
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

// ═══════════════════════════════════════════════════════════════════════════════
// PÁGINAS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── FINANCEIRO ───────────────────────────────────────────────────────────────
const Financeiro = ({alunos, setAlunos}) => {
  const hoje = new Date();
  const [mesFiltro, setMesFiltro] = useState(`${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalExcluir, setModalExcluir] = useState(null);
  const [modalHistorico, setModalHistorico] = useState(null);

  const todasCobrancas = gerarCobrancas(alunos);
  const cobrancasMes = todasCobrancas.filter(c => c.mesRef === mesFiltro);

  const marcarPago = (cobrancaId) => {
    const c = cobrancasMes.find(x => x.id === cobrancaId);
    if (!c) return;
    const aluno = alunos.find(a => a.id === c.alunoId);
    if (!aluno) return;
    
    const novoPagamentos = {
      ...(aluno.pagamentos || {}),
      [c.mesRef]: { pago: true, dataPagamento: new Date().toISOString().split("T")[0] }
    };
    
    setAlunos(prev => prev.map(a => a.id === aluno.id ? { ...a, pagamentos: novoPagamentos } : a));
  };

  const salvarEdicao = (alunoAtualizado) => {
    setAlunos(prev => prev.map(a => a.id === alunoAtualizado.id ? alunoAtualizado : a));
    setModalEditar(null);
  };

  const confirmarExclusao = () => {
    if (!modalExcluir) return;
    setAlunos(prev => prev.filter(a => a.id !== modalExcluir.id));
    setModalExcluir(null);
  };

  const anomesParaLabel = (am) => {
    const [ano, mes] = am.split("-");
    return `${MESES[Number(mes) - 1]} ${ano}`;
  };

  const totalPendente = cobrancasMes.filter(c => !c.pago).reduce((s, c) => s + c.valor, 0);
  const totalPago = cobrancasMes.filter(c => c.pago).reduce((s, c) => s + c.valor, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>Financeiro</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={DollarSign} label="Total Pago" value={`R$ ${totalPago.toLocaleString("pt-BR")}`} sub="Este mês" color="#22c55e" />
        <StatCard icon={DollarSign} label="Pendente" value={`R$ ${totalPendente.toLocaleString("pt-BR")}`} sub="A receber" color="#eab308" />
      </div>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Cobranças - {anomesParaLabel(mesFiltro)}</h2>
          <input
            type="month"
            value={mesFiltro}
            onChange={e => setMesFiltro(e.target.value)}
            style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13 }}
          />
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {cobrancasMes.map(c => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#1e1e1e", borderRadius: 10, border: "1px solid #2a2a2a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#888" }}>
                  {c.alunoNome.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{c.alunoNome}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>Vence dia {new Date(c.dataVencimento).getDate()}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>R$ {c.valor}</span>
                <Badge status={c.status} />
                {!c.pago && (
                  <button
                    onClick={() => marcarPago(c.id)}
                    style={{ background: "#22c55e", border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    Confirmar
                  </button>
                )}
                <button
                  onClick={() => setModalHistorico(alunos.find(a => a.id === c.alunoId))}
                  style={{ background: "transparent", border: "1px solid #555", color: "#aaa", borderRadius: 6, padding: "6px 10px", fontSize: 11, cursor: "pointer" }}
                >
                  Histórico
                </button>
              </div>
            </div>
          ))}
          {cobrancasMes.length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
              Nenhuma cobrança para este mês.
            </div>
          )}
        </div>
      </Card>

      {modalEditar && <ModalEditar aluno={modalEditar} onSave={salvarEdicao} onClose={() => setModalEditar(null)} />}
      {modalExcluir && <ModalExcluir aluno={modalExcluir} onConfirm={confirmarExclusao} onClose={() => setModalExcluir(null)} />}
      {modalHistorico && <ModalHistorico aluno={modalHistorico} cobrancas={todasCobrancas} onClose={() => setModalHistorico(null)} />}
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({alunos}) => {
  const hoje = new Date();
  const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
  const cob = gerarCobrancas(alunos).filter(c => c.mesRef === mesAtual);
  const ativos = alunos.filter(a => a.status === "ativo").length;
  const inativos = alunos.filter(a => a.status === "inativo").length;
  const pendentes = cob.filter(c => !c.pago).length;
  const receita = cob.filter(c => c.pago).reduce((s, c) => s + c.valor, 0);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-white text-[26px] font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={Users} label="Alunos Ativos" value={ativos} sub={`${inativos} inativos`} color="#22c55e" />
        <StatCard icon={DollarSign} label="Receita Mês" value={`R$ ${receita.toLocaleString("pt-BR")}`} sub={`${pendentes} pendentes`} color="#F06523" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Alunos por Local</h3>
          {["Arena Clécio", "Prainha ZN", "Prainha ZS"].map(local => {
            const count = alunos.filter(a => a.local === local && a.status === "ativo").length;
            return (
              <div key={local} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #2a2a2a" }}>
                <span style={{ color: "#aaa" }}>{local}</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{count}</span>
              </div>
            );
          })}
        </Card>

        <Card>
          <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Resumo Financeiro</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#aaa" }}>Total Pago</span>
              <span style={{ color: "#22c55e", fontWeight: 600 }}>R$ {receita.toLocaleString("pt-BR")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#aaa" }}>Pendente</span>
              <span style={{ color: "#eab308", fontWeight: 600 }}>R$ {cob.filter(c => !c.pago).reduce((s, c) => s + c.valor, 0).toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── CADASTRO ─────────────────────────────────────────────────────────────────
const Cadastro = ({alunos, setAlunos}) => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", local: "", mensalidade: "", diaVencimento: "10", status: "ativo" });
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [busca, setBusca] = useState("");
  const [modalEditar, setModalEditar] = useState(null);
  const [modalExcluir, setModalExcluir] = useState(null);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErros(e => ({ ...e, [k]: undefined })); };

  const salvar = () => {
    const e = validate(form);
    if (Object.keys(e).length) { setErros(e); return; }
    const novo = { ...form, id: Date.now(), mensalidade: Number(form.mensalidade), diaVencimento: Number(form.diaVencimento), pagamentos: {} };
    setAlunos(prev => [...prev, novo]);
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
    setForm({ nome: "", email: "", telefone: "", local: "", mensalidade: "", diaVencimento: "10", status: "ativo" });
  };

  const salvarEdicao = (alunoAtualizado) => {
    setAlunos(prev => prev.map(a => a.id === alunoAtualizado.id ? alunoAtualizado : a));
    setModalEditar(null);
  };

  const confirmarExclusao = () => {
    if (!modalExcluir) return;
    setAlunos(prev => prev.filter(a => a.id !== modalExcluir.id));
    setModalExcluir(null);
  };

  const filtrados = alunos.filter(a => a.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>Cadastro de Alunos</h1>

      {sucesso && (
        <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "12px 16px", color: "#22c55e" }}>
          Aluno cadastrado com sucesso!
        </div>
      )}

      <Card>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Novo Aluno</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ ["nome", "Nome Completo", "text"], ["email", "E-mail", "email"], ["telefone", "Telefone", "text"], ["mensalidade", "Mensalidade (R$)", "number"] ].map(([k, label, type]) => (
            <div key={k}>
              <label style={{ color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5 }}>{label}</label>
              <input type={type} value={form[k]} onChange={e => set(k, e.target.value)} style={iSt(erros[k])} />
              {erros[k] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 3 }}>{erros[k]}</p>}
            </div>
          ))}
          <div>
            <label style={{ color: "#777", fontSize: 11, letterSpacing: 1, display: "block", marginBottom: 5 }}>Local</label>
            <select value={form.local} onChange={e => set("local", e.target.value)} style={{ ...iSt(erros.local), appearance: "none" }}>
              <option value="">Selecione...</option>
              {["Prainha ZN", "Prainha ZS", "Arena Clécio"].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {erros.local && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 3 }}>{erros.local}</p>}
          </div>
        </div>
        <button onClick={salvar} style={{ marginTop: 20, background: "#F06523", border: "none", color: "#fff", borderRadius: 8, padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          Cadastrar Aluno
        </button>
      </Card>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Lista de Alunos</h2>
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, width: 200 }}
          />
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {filtrados.map(aluno => (
            <div key={aluno.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#1e1e1e", borderRadius: 10, border: "1px solid #2a2a2a" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{aluno.nome}</div>
                <div style={{ color: "#666", fontSize: 12 }}>{aluno.email} • {aluno.local}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Badge status={aluno.status} />
                <button onClick={() => setModalEditar(aluno)} style={{ background: "transparent", border: "1px solid #555", color: "#aaa", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Editar</button>
                <button onClick={() => setModalExcluir(aluno)} style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>Excluir</button>
              </div>
            </div>
          ))}
          {filtrados.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Nenhum aluno encontrado.</div>}
        </div>
      </Card>

      {modalEditar && <ModalEditar aluno={modalEditar} onSave={salvarEdicao} onClose={() => setModalEditar(null)} />}
      {modalExcluir && <ModalExcluir aluno={modalExcluir} onConfirm={confirmarExclusao} onClose={() => setModalExcluir(null)} />}
    </div>
  );
};

// ─── TREINOS ──────────────────────────────────────────────────────────────────
const Treinos = ({ alunos, setAlunos }) => {
  const [vista, setVista] = useState("lista");
  const [semanaAtual, setSemanaAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(new Date());
  const [presencas, setPresencas] = useState({});
  const [filtroLocal, setFiltroLocal] = useState("todos");

  const alunosAtivos = alunos.filter(a => a.status === "ativo" && (filtroLocal === "todos" || a.local === filtroLocal));

  const formatarData = (data) => {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' }).format(data);
  };

  const formatarDataCurta = (data) => {
    return data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
  };

  const getDiasSemana = () => {
    const inicioSemana = new Date(semanaAtual);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const dia = new Date(inicioSemana);
      dia.setDate(inicioSemana.getDate() + i);
      return dia;
    });
  };

  const getChavePresenca = (alunoId, data) => {
    return `${alunoId}-${data.toISOString().split('T')[0]}`;
  };

  const togglePresenca = (alunoId, data) => {
    const chave = getChavePresenca(alunoId, data);
    setPresencas(prev => ({
      ...prev,
      [chave]: !prev[chave]
    }));
  };

  const getTotalPresentes = (data) => {
    return alunosAtivos.filter(a => presencas[getChavePresenca(a.id, data)]).length;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>Treinos</h1>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <select
            value={filtroLocal}
            onChange={e => setFiltroLocal(e.target.value)}
            style={{ background: "#2a2a2a", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13 }}
          >
            <option value="todos">Todos os locais</option>
            <option value="Arena Clécio">Arena Clécio</option>
            <option value="Prainha ZN">Prainha ZN</option>
            <option value="Prainha ZS">Prainha ZS</option>
          </select>
          <button
            onClick={() => setVista("semana")}
            style={{
              background: vista === "semana" ? "#F06523" : "#2a2a2a",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Semana
          </button>
          <button
            onClick={() => setVista("lista")}
            style={{
              background: vista === "lista" ? "#F06523" : "#2a2a2a",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Total de Alunos</div>
          <div style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginTop: 4 }}>{alunosAtivos.length}</div>
        </Card>
        <Card>
          <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Presentes Hoje</div>
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: 700, marginTop: 4 }}>{getTotalPresentes(diaSelecionado)}</div>
        </Card>
        <Card>
          <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Faltas Hoje</div>
          <div style={{ color: "#ef4444", fontSize: 28, fontWeight: 700, marginTop: 4 }}>{alunosAtivos.length - getTotalPresentes(diaSelecionado)}</div>
        </Card>
      </div>

      {/* Vista de Lista com Checklist */}
      {vista === "lista" && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Checklist de Presença</h2>
            <input
              type="date"
              value={diaSelecionado.toISOString().split('T')[0]}
              onChange={e => setDiaSelecionado(new Date(e.target.value))}
              style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13 }}
            />
          </div>

          <div style={{ marginBottom: 16, padding: "12px 16px", background: "#1e1e1e", borderRadius: 8 }}>
            <span style={{ color: "#888", fontSize: 14 }}>
              Data: <strong style={{ color: "#fff" }}>{formatarData(diaSelecionado)}</strong>
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alunosAtivos.map(aluno => {
              const presente = presencas[getChavePresenca(aluno.id, diaSelecionado)];
              return (
                <div
                  key={aluno.id}
                  onClick={() => togglePresenca(aluno.id, diaSelecionado)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: presente ? "rgba(34,197,94,0.1)" : "#1e1e1e",
                    border: `1px solid ${presente ? "rgba(34,197,94,0.3)" : "#2a2a2a"}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${presente ? "#22c55e" : "#555"}`,
                      background: presente ? "#22c55e" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {presente && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{aluno.nome}</div>
                      <div style={{ color: "#666", fontSize: 12 }}>{aluno.local}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      color: presente ? "#22c55e" : "#888",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase"
                    }}>
                      {presente ? "Presente" : "Ausente"}
                    </span>
                  </div>
                </div>
              );
            })}
            {alunosAtivos.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "#666" }}>
                Nenhum aluno ativo encontrado.
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Vista de Semana */}
      {vista === "semana" && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <button
              onClick={() => {
                const nova = new Date(semanaAtual);
                nova.setDate(nova.getDate() - 7);
                setSemanaAtual(nova);
              }}
              style={{ background: "#2a2a2a", border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
            >
              ← Anterior
            </button>
            <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
              {formatarData(getDiasSemana()[0])} - {formatarData(getDiasSemana()[6])}
            </h3>
            <button
              onClick={() => {
                const nova = new Date(semanaAtual);
                nova.setDate(nova.getDate() + 7);
                setSemanaAtual(nova);
              }}
              style={{ background: "#2a2a2a", border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer" }}
            >
              Próxima →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {getDiasSemana().map((dia, i) => {
              const presentes = getTotalPresentes(dia);
              return (
                <div
                  key={i}
                  onClick={() => {
                    setDiaSelecionado(dia);
                    setVista("lista");
                  }}
                  style={{
                    background: "#1e1e1e",
                    borderRadius: 8,
                    padding: 12,
                    minHeight: 120,
                    cursor: "pointer",
                    border: dia.toDateString() === diaSelecionado.toDateString() ? "1px solid #F06523" : "1px solid transparent"
                  }}
                >
                  <div style={{ color: "#888", fontSize: 11, textTransform: "capitalize", marginBottom: 4, textAlign: "center" }}>
                    {dia.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </div>
                  <div style={{ color: "#fff", fontSize: 18, fontWeight: 600, textAlign: "center", marginBottom: 8 }}>
                    {dia.getDate()}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>{presentes}</span>
                    <span style={{ color: "#666", fontSize: 11 }}> /{alunosAtivos.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

// ─── CAMPEONATOS ──────────────────────────────────────────────────────────────
const Campeonatos = () => {
  const [campeonatos, setCampeonatos] = useState(MOCK_CAMPEONATOS);
  const [modalNovo, setModalNovo] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);

  const salvarNovo = (campeonato) => {
    setCampeonatos(prev => [...prev, campeonato]);
  };

  const salvarEdicao = (campeonato) => {
    setCampeonatos(prev => prev.map(c => c.id === campeonato.id ? campeonato : c));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>Campeonatos</h1>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Lista de Campeonatos</h2>
          <button
            onClick={() => setModalNovo(true)}
            style={{
              background: "#F06523",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            + Novo Campeonato
          </button>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {campeonatos.map(campeonato => (
            <div key={campeonato.id} style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: 0 }}>{campeonato.nome}</h3>
                  <p style={{ color: "#888", fontSize: 13, margin: "4px 0" }}>{campeonato.data}</p>
                  <p style={{ color: "#888", fontSize: 13, margin: 0 }}>{campeonato.local}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Badge status={campeonato.status} />
                  <button
                    onClick={() => setModalEditar(campeonato)}
                    style={{
                      background: "transparent",
                      border: "1px solid #555",
                      color: "#aaa",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
          {campeonatos.length === 0 && (
            <div style={{ textAlign: "center", padding: 40 }}>
              <p style={{ color: "#666", fontSize: 14 }}>Nenhum campeonato cadastrado.</p>
            </div>
          )}
        </div>
      </Card>

      {modalNovo && <ModalNovoCampeonato onSave={salvarNovo} onClose={() => setModalNovo(false)} />}
      {modalEditar && <ModalEditarCampeonato campeonato={modalEditar} onSave={salvarEdicao} onClose={() => setModalEditar(null)} />}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [alunos, setAlunos] = useState(MOCK_ALUNOS_INICIAL);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "financeiro", label: "Financeiro", icon: DollarSign },
    { id: "cadastro", label: "Cadastro", icon: Users },
    { id: "treinos", label: "Treinos", icon: Dumbbell },
    { id: "campeonatos", label: "Campeonatos", icon: Trophy }
  ];

  const pages = {
    dashboard: <Dashboard alunos={alunos} />,
    financeiro: <Financeiro alunos={alunos} setAlunos={setAlunos} />,
    cadastro: <Cadastro alunos={alunos} setAlunos={setAlunos} />,
    treinos: <Treinos alunos={alunos} setAlunos={setAlunos} />,
    campeonatos: <Campeonatos />
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Barlow', sans-serif", background: "#1A1A1A" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#1a1a1a;}::-webkit-scrollbar-thumb{background:#2e2e2e;border-radius:3px;}input:focus,select:focus{border-color:#F06523!important;box-shadow:0 0 0 3px rgba(240,101,35,0.1);}button:active{filter:brightness(0.9);}`}</style>
      
      <header className="bg-[#1f1f1f] border-b border-[#2a2a2a] px-4 sm:px-6 lg:px-7 h-16 flex items-center justify-between sticky top-0 z-50">
        <Logo />
        <nav className="hidden sm:flex gap-1">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPagina(id)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                pagina === id 
                  ? "bg-[rgba(240,101,35,0.1)] text-[#F06523] border border-[rgba(240,101,35,0.2)]" 
                  : "bg-transparent text-[#666] border border-transparent hover:text-[#999]"
              }`}
            >
              <Icon size={13} />{label}
            </button>
          ))}
        </nav>
        {/* Menu mobile */}
        <nav className="flex sm:hidden gap-1 overflow-x-auto">
          {nav.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPagina(id)}
              className={`p-2 rounded-md transition-all ${
                pagina === id 
                  ? "bg-[rgba(240,101,35,0.1)] text-[#F06523]" 
                  : "bg-transparent text-[#666]"
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell size={16} color="#444" className="cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F06523] rounded-full" />
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F06523] to-[#c94e1a] flex items-center justify-center font-bold text-sm text-white cursor-pointer">
            C
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 w-full flex-1">
        {pages[pagina]}
      </main>
    </div>
  );
}
