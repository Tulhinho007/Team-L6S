# 📋 RESUMO DO SISTEMA – Team L6S Futevôlei
> Última atualização: 25/03/2026 — v2.0

---

## 🎯 Visão Geral
Sistema de gestão completo para a equipe de futevôlei **Team L6S**, desenvolvido em React com tema dark e identidade visual laranja `#F06523`.

---

## 🏗️ Tecnologias

| Tecnologia         | Uso                                              |
|-------------------|--------------------------------------------------|
| React + Hooks      | useState para estado global/local                |
| Inline CSS         | Tema dark consistente, sem dependência de lib CSS |
| Lucide React       | Ícones de interface                              |
| Validação Zod-like | Função `validate()` com regras por campo         |
| Google Fonts       | Barlow + Barlow Condensed                        |

---

## 🎨 Design System

| Token         | Valor              |
|--------------|--------------------|
| Fundo app    | `#1A1A1A`          |
| Fundo cards  | `#242424`          |
| Fundo header | `#1f1f1f`          |
| Fundo inputs | `#1e1e1e`          |
| Destaque     | `#F06523` (laranja)|
| Bordas       | `#2e2e2e` / `#333` |
| Fonte body   | Barlow             |
| Fonte título | Barlow Condensed   |

---

## 📁 Componentes

```
App
├── Logo                  – SVG hexagonal + nome
├── Badge                 – Status pill (ativo/inativo/pago/pendente/vencido/inscricoes/encerrado)
├── Card                  – Container dark padrão
├── StatCard              – Métrica com ícone colorido
├── Modal                 – Overlay base com click-outside
├── MHead                 – Cabeçalho de modal reutilizável
├── ModalEditar           – Edição completa do aluno (todos os campos)
├── ModalExcluir          – Confirmação de exclusão com aviso
├── ModalHistorico        – Timeline de pagamentos por mês do aluno
└── Pages
    ├── Dashboard         – Resumo, treinos do dia, pendências do mês
    ├── Cadastro          – Formulário validado + tabela com busca
    ├── Financeiro        – Controle mensal com navegação ← → e modais
    ├── Treinos           – Grade por local com barra de ocupação
    └── Campeonatos       – Chaves com destaque para Team L6S
```

---

## 💰 Sistema Financeiro (v2.0 — Histórico Mensal)

### Como funciona
- Cada aluno tem um **`diaVencimento`** (ex: dia 5, dia 10, dia 20)
- A função `gerarCobrancas()` cria automaticamente **uma linha por aluno por mês**
- Exibe: 2 meses anteriores + mês atual + próximo mês
- Cada cobrança tem status automático:
  - `pago` → pagamento confirmado
  - `pendente` → ainda dentro do prazo
  - `vencido` → data já passou e não pago

### Navegação por mês
- Botões **← →** no topo da página Financeiro
- Filtro por `mesRef` (formato `YYYY-MM`)

### Ações por cobrança
| Botão      | Ícone       | Ação                                           |
|------------|-------------|------------------------------------------------|
| Confirmar  | ✅ verde    | Marca como pago, salva data de hoje            |
| Desmarcar  | ❌ vermelho | Remove o pagamento do mês                      |
| Histórico  | 🕐          | Abre modal com todos os meses do aluno         |
| Editar     | ✏️ laranja  | Abre modal para editar qualquer campo do aluno |
| Excluir    | 🗑️ vermelho | Abre modal de confirmação antes de deletar     |

### Estrutura de dados do aluno
```js
{
  id: 1,
  nome: "Carlos Silva",
  email: "carlos@email.com",
  telefone: "(81) 99999-1111",
  local: "Prainha ZN",
  status: "ativo",
  mensalidade: 180,
  diaVencimento: 5,          // dia do mês que vence
  pagamentos: {
    "2026-03": { pago: true, dataPagamento: "2026-03-04" },
    "2026-04": { pago: true, dataPagamento: "2026-04-04" },
    // próximos meses: ausentes até serem pagos
  }
}
```

---

## 🔐 Validações

| Campo          | Regra                                  |
|---------------|----------------------------------------|
| Nome          | Mínimo 3 caracteres                    |
| E-mail        | Regex de formato válido                |
| Telefone      | Mínimo 10 dígitos                      |
| Local         | Seleção obrigatória                    |
| Mensalidade   | Número positivo                        |
| Dia vencimento| Entre 1 e 28                          |

---

## 📄 Arquivos

| Arquivo              | Caminho                                     |
|---------------------|---------------------------------------------|
| `team-l6s-app.jsx`  | `/mnt/user-data/outputs/team-l6s-app.jsx`   |
| `RESUMO.md`         | `/mnt/user-data/outputs/RESUMO.md`          |

---

## ✅ Changelog

### v2.0 — 25/03/2026
- ♻️ Refatoração completa do módulo Financeiro
- ✅ Sistema de cobranças mensais com histórico por aluno
- ✅ Modal de edição (todos os campos do aluno)
- ✅ Modal de exclusão com confirmação
- ✅ Modal de histórico com timeline de pagamentos
- ✅ Navegação de mês com botões ← →
- ✅ Campo `diaVencimento` adicionado ao cadastro
- ✅ Badges de status automáticos (pago/pendente/vencido)

### v1.0 — 25/03/2026
- ✅ Estrutura inicial com 5 páginas
- ✅ Dashboard, Cadastro, Financeiro, Treinos, Campeonatos
- ✅ Tema dark + identidade Team L6S

---

## 🚀 Próximos Passos Sugeridos

- [ ] Persistência com localStorage ou Supabase
- [ ] Autenticação de administrador
- [ ] Exportação de relatório financeiro (PDF/Excel)
- [ ] Notificações de vencimento (WhatsApp/e-mail)
- [ ] Filtro por aluno/local na tabela financeira
- [ ] PWA para uso mobile no campo
