// ==========================================================================================
// 📊 kanban-gerente.js – Painel Gerente Agroverso com lógica dinâmica
// 🌱 Refatorado com sabedoria, força e beleza. Perfil controlado por config.
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = obterConfiguracaoKanban(); // 🌿 Determina permissões do perfil

  const tarefas = [
    {
      id: "GER001",
      titulo: "Validar relatórios da semana",
      descricao: "Analisar entregas dos líderes e técnicos.",
      prioridade: "alta",
      status: "a-fazer"
    },
    {
      id: "GER002",
      titulo: "Atualizar cronograma de campo",
      descricao: "Ajustes conforme mudanças climáticas.",
      prioridade: "media",
      status: "em-execucao"
    },
    {
      id: "GER003",
      titulo: "Revisar metas do mês",
      descricao: "Comparar desempenho com os indicadores previstos.",
      prioridade: "baixa",
      status: "pendencias"
    },
    {
      id: "GER004",
      titulo: "Relatório de produtividade",
      descricao: "Fechar relatório mensal da equipe.",
      prioridade: "alta",
      status: "concluidas"
    }
  ];

  // 🧩 Mapeia colunas visíveis permitidas para este perfil
  const colunas = {};
  config.colunas.forEach(status => {
    const colunaEl = document.getElementById(status);
    if (colunaEl) colunas[status] = colunaEl;
  });

  // A seguir: Parte 2 – Geração dos cartões com validação baseada em config

  // 🧱 Cria um cartão de tarefa com base nas permissões do gerente
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

    // 🔁 Drag controlado
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

  // 🔁 Se o gerente tiver permissão, ativa drag & drop nas colunas
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
