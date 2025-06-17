// ==========================================================================================
// 🔧 kanban-tecnico.js – Painel Técnico Agroverso (Refatorado)
// 🌱 Foco absoluto em execução simples, acessível e confiável. 12/10 técnico.
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const config = obterConfiguracaoKanban(); // 🔍 Verifica se está operando como técnico

  const tarefas = [
    {
      id: "TEC001",
      titulo: "Verificar bomba de irrigação",
      descricao: "Checar funcionamento da válvula no setor 3.",
      status: "a-fazer"
    },
    {
      id: "TEC002",
      titulo: "Enviar foto da horta vertical",
      descricao: "Imagem do painel 7 após manutenção.",
      status: "a-fazer"
    },
    {
      id: "TEC003",
      titulo: "Atualizar sensor de pH",
      descricao: "Nova leitura no tanque principal.",
      status: "concluidas"
    }
  ];

  const colunas = {};
  config.colunas.forEach(status => {
    const el = document.getElementById(status);
    if (el) colunas[status] = el;
  });

  // A seguir: Parte 2 – criação dos cartões com ação técnica direta

  // 🛠️ Gera cartão com botão de conclusão (ação única)
  function criarCard(tarefa) {
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.setAttribute("data-id", tarefa.id);
    card.setAttribute("data-status", tarefa.status);
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `${tarefa.titulo}. Status: ${tarefa.status}`);

    // Conteúdo base do card
    card.innerHTML = `
      <h4 class="kanban-titulo">${tarefa.titulo}</h4>
      <p class="kanban-descricao">${tarefa.descricao}</p>
    `;

    // ✅ Se permitido, adiciona botão de ação
    if (config.acaoBotao && tarefa.status === "a-fazer") {
      const botaoAcao = document.createElement("button");
      botaoAcao.textContent = "✅ Marcar como feito";
      botaoAcao.className = "kanban-btn-concluir";
      botaoAcao.setAttribute("aria-label", `Concluir tarefa: ${tarefa.titulo}`);

      botaoAcao.addEventListener("click", () => {
        colunas["concluidas"].appendChild(card);
        card.setAttribute("data-status", "concluidas");
        botaoAcao.remove();
      });

      card.appendChild(botaoAcao);
    }

    return card;
  }

  // 🚀 Inserção nas colunas visíveis
  tarefas.forEach(tarefa => {
    const coluna = colunas[tarefa.status];
    if (coluna) {
      const card = criarCard(tarefa);
      coluna.appendChild(card);
    }
  });
});
