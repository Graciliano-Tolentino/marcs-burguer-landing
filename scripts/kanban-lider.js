// ==========================================================================================
// 🧭 kanban-lider.js – Painel do Líder de Equipe • Agroverso
// 🌱 Refatorado com sabedoria, força e beleza para 12/10 de liderança tática
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = obterConfiguracaoKanban(); // 🔐 Detecta perfil e permissões

  const tarefas = [
    {
      id: "LID001",
      titulo: "Distribuir tarefas do dia",
      descricao: "Organizar demandas entre os técnicos do turno.",
      prioridade: "alta",
      status: "a-fazer"
    },
    {
      id: "LID002",
      titulo: "Validar fotos enviadas",
      descricao: "Verificar se os registros de campo estão completos.",
      prioridade: "media",
      status: "a-fazer"
    },
    {
      id: "LID003",
      titulo: "Relatório diário de execução",
      descricao: "Consolidar entregas e enviar à gerência.",
      prioridade: "baixa",
      status: "concluidas"
    }
  ];

  const colunas = {};
  config.colunas.forEach(status => {
    const el = document.getElementById(status);
    if (el) colunas[status] = el;
  });

  // A seguir: Parte 2 – Geração dos cartões com validação do perfil

  // 🧠 Gera um cartão de tarefa leve e acessível para liderança
  function criarCard(tarefa) {
    const card = document.createElement("div");
    card.className = `kanban-card prioridade-${tarefa.prioridade}`;
    card.setAttribute("data-id", tarefa.id);
    card.setAttribute("data-status", tarefa.status);
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `${tarefa.titulo}. Prioridade: ${tarefa.prioridade}.`);

    card.innerHTML = `
      <h4 class="kanban-titulo">${tarefa.titulo}</h4>
      <p class="kanban-descricao">${tarefa.descricao}</p>
    `;

    // 🔁 Se permitido, aplica drag
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

  // 🚀 Inserção controlada por colunas válidas
  tarefas.forEach(tarefa => {
    const coluna = colunas[tarefa.status];
    if (coluna) {
      const card = criarCard(tarefa);
      coluna.appendChild(card);
    }
  });

  // 🔐 Se permitido, ativa drag & drop entre colunas controladas
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
        if (!card) return;

        const origem = card.getAttribute("data-status");
        const destino = status;

        const movimentacaoPermitida =
          !config.restritoEntreColunas ||
          (origem === "a-fazer" && destino === "concluidas") ||
          (origem === "concluidas" && destino === "a-fazer");

        if (movimentacaoPermitida) {
          coluna.appendChild(card);
          card.setAttribute("data-status", destino);
        }
      });
    });
  }
});
