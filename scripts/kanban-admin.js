// ==========================================================================================
// 👑 kanban-admin.js – Painel Kanban Dinâmico Agroverso
// 🌱 Refatorado com sabedoria, força e beleza para 12/10 de excelência
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = obterConfiguracaoKanban(); // Integração com perfil dinâmico

  // 🌿 Tarefas simuladas (futuramente alimentadas por backend/API)
  const tarefas = [
    {
      id: "ADM001",
      titulo: "Revisar contrato com fornecedores",
      descricao: "Atualizar cláusulas do contrato vigente com a empresa XYZ.",
      prioridade: "alta",
      status: "a-fazer"
    },
    {
      id: "ADM002",
      titulo: "Aprovar relatório financeiro do mês",
      descricao: "Relatório de receitas e despesas de todas as unidades.",
      prioridade: "media",
      status: "em-execucao"
    },
    {
      id: "ADM003",
      titulo: "Reunião com equipe de TI",
      descricao: "Alinhar cronograma do módulo de sensores inteligentes.",
      prioridade: "baixa",
      status: "pendencias"
    },
    {
      id: "ADM004",
      titulo: "Backup completo dos servidores",
      descricao: "Agendado para 23h com verificação de integridade.",
      prioridade: "alta",
      status: "concluidas"
    }
  ];

  // 📦 Mapeamento somente das colunas permitidas no perfil
  const colunas = {};
  config.colunas.forEach(status => {
    const colunaEl = document.getElementById(status);
    if (colunaEl) colunas[status] = colunaEl;
  });

  // A seguir: Parte 2 – geração dos cards condicionada ao perfil

  // 🧠 Cria um cartão de tarefa com base nas permissões do perfil ativo
  function criarCard(tarefa) {
    const card = document.createElement("div");
    card.className = `kanban-card prioridade-${tarefa.prioridade}`;
    card.setAttribute("data-id", tarefa.id);
    card.setAttribute("data-status", tarefa.status);
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `${tarefa.titulo}. Prioridade: ${tarefa.prioridade}.`);

    // ✍️ Conteúdo visual do cartão
    card.innerHTML = `
      <h4 class="kanban-titulo">${tarefa.titulo}</h4>
      <p class="kanban-descricao">${tarefa.descricao}</p>
    `;

    // 🔁 Drag & Drop apenas se permitido
    if (config.dragDrop) {
      card.setAttribute("draggable", "true");

      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tarefa.id);
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
    }

    return card;
  }

  // 🚀 Inserção nas colunas autorizadas
  tarefas.forEach(tarefa => {
    if (colunas[tarefa.status]) {
      const card = criarCard(tarefa);
      colunas[tarefa.status].appendChild(card);
    }
  });

  // 🔁 Se o perfil permite movimentação, ativa drag & drop nas colunas
  if (config.dragDrop) {
    Object.entries(colunas).forEach(([status, coluna]) => {
      coluna.addEventListener("dragover", (e) => {
        e.preventDefault();
        coluna.classList.add("kanban-over");
      });

      coluna.addEventListener("dragleave", () => {
        coluna.classList.remove("kanban-over");
      });

      coluna.addEventListener("drop", (e) => {
        e.preventDefault();
        coluna.classList.remove("kanban-over");

        const id = e.dataTransfer.getData("text/plain");
        const card = document.querySelector(`[data-id="${id}"]`);

        if (card && card.dataset.status !== status) {
          coluna.appendChild(card);
          card.setAttribute("data-status", status);
        }
      });
    });
  }
});
