// ==========================================================================================
// 🧩 kanban-config.js – Central de Configuração dos Painéis Kanban Agroverso
// 🌱 Permissões, comportamentos e colunas ativas por perfil
// ==========================================================================================

const KANBAN_CONFIG = {
  administrador: {
    dragDrop: true,
    colunas: ["a-fazer", "em-execucao", "concluidas", "pendencias"],
    podeEditar: true,
    podeValidar: true,
    podeRemover: true,
    acaoBotao: false
  },
  gerente: {
    dragDrop: true,
    colunas: ["a-fazer", "em-execucao", "concluidas", "pendencias"],
    podeEditar: false,
    podeValidar: true,
    podeRemover: false,
    acaoBotao: false
  },
  lider: {
    dragDrop: true,
    colunas: ["a-fazer", "concluidas"],
    podeEditar: false,
    podeValidar: true,
    podeRemover: false,
    restritoEntreColunas: true,
    acaoBotao: false
  },
  tecnico: {
    dragDrop: false,
    colunas: ["a-fazer", "concluidas"],
    podeEditar: false,
    podeValidar: false,
    podeRemover: false,
    acaoBotao: true
  }
};

/**
 * 🔍 Recupera a configuração ativa com base no perfil do usuário.
 * Pode ser obtido por:
 *   - `data-perfil` no <body>
 *   - `localStorage.getItem('perfil')`
 *   - Token decodificado
 */

function obterConfiguracaoKanban() {
  let perfil = null;

  // 🧠 Exemplo 1: HTML <body data-perfil="gerente">
  const body = document.querySelector("body");
  if (body && body.dataset.perfil) {
    perfil = body.dataset.perfil.toLowerCase();
  }

  // 🔄 Exemplo 2: localStorage
  if (!perfil && localStorage.getItem("perfil")) {
    perfil = localStorage.getItem("perfil").toLowerCase();
  }

  // 🛡️ Fallback para técnico se não houver identificação
  const config = KANBAN_CONFIG[perfil] || KANBAN_CONFIG.tecnico;

  return {
    perfil,
    ...config
  };
}
