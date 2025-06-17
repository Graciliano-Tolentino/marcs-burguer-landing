// ==========================================================================================
// 🧠 kanban.js – Painel de Tarefas com Drag & Drop e Acessibilidade • Agroverso
// 🌱 Organização regenerativa, usabilidade refinada e foco em gestão de excelência
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 🔖 Lista de tarefas simuladas (pode ser trocada por fetch API futuramente)
  const tarefas = [
    {
      id: "T001",
      titulo: "Atualizar sensores da zona norte",
      descricao: "Verificar calibração e registrar no sistema.",
      prioridade: "alta",
      status: "a-fazer"
    },
    {
      id: "T002",
      titulo: "Analisar relatório mensal",
      descricao: "Conferir indicadores de desempenho.",
      prioridade: "media",
      status: "em-execucao"
    },
    {
      id: "T003",
      titulo: "Revisar permissões de usuários",
      descricao: "Validar perfis e funções.",
      prioridade: "baixa",
      status: "concluidas"
    },
    {
      id: "T004",
      titulo: "Corrigir falha no módulo de irrigação",
      descricao: "Erro intermitente no campo 12.",
      prioridade: "alta",
      status: "pendencias"
    }
  ];

  // 📦 Referência das colunas pelo ID
  const colunas = {
    "a-fazer": document.getElementById("a-fazer"),
    "em-execucao": document.getElementById("em-execucao"),
    "concluidas": document.getElementById("concluidas"),
    "pendencias": document.getElementById("pendencias")
  };

  // A seguir: Parte 2 – Criação e inserção refinada dos cards, com classes e ARIA

  // 🧱 Função que gera o card com estilo e semântica refinada
  function criarCard(tarefa) {
    const card = document.createElement("div");
    card.className = `kanban-card prioridade-${tarefa.prioridade}`;
    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", tarefa.id);
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `${tarefa.titulo} (${tarefa.prioridade})`);

    card.innerHTML = `
      <h4 class="kanban-titulo">${tarefa.titulo}</h4>
      <p class="kanban-descricao">${tarefa.descricao}</p>
    `;

    return card;
  }

  // 🚀 Inserção inicial de cada tarefa na respectiva coluna
  tarefas.forEach(tarefa => {
    const coluna = colunas[tarefa.status];
    if (coluna) {
      const card = criarCard(tarefa);
      coluna.appendChild(card);

      // 🎯 Eventos de drag
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tarefa.id);
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
    }
  });

  // 🔁 Permitir soltura e realce nas colunas ao arrastar
  Object.values(colunas).forEach(coluna => {
    coluna.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necessário para permitir o drop
      coluna.classList.add("kanban-over");
    });

    coluna.addEventListener("dragleave", () => {
      coluna.classList.remove("kanban-over");
    });

    coluna.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const card = document.querySelector(`[data-id="${id}"]`);

      if (card) {
        coluna.appendChild(card);
        coluna.classList.remove("kanban-over");

        // 📝 Atualiza visualmente o status (opcional: persistir em backend futuramente)
        const novoStatus = coluna.getAttribute("id");
        card.dataset.status = novoStatus;
      }
    });
  });
});
