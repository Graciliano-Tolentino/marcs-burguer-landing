// ===========================================================================================
// 📊 dashboard.js – Personalização dinâmica do painel Agroverso
// 🌱 Com sabedoria, força, beleza e segurança institucional
// ===========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const mensagemEl = document.getElementById("mensagem-perfil");
  const subtitulo = document.getElementById("subtitulo-perfil");
  const perfil = sessionStorage.getItem("usuario_perfil")?.toLowerCase();
  const email = sessionStorage.getItem("usuario_email");

  // 🔐 Proteção contra acesso direto não autorizado
  if (!perfil || !email) {
    alert("⚠️ Acesso não autorizado ou sessão expirada. Faça login novamente.");
    window.location.href = "login.html";
    return;
  }

  // 📦 Conteúdos por tipo de perfil
  const conteudos = {
    administrador: {
      titulo: "👑 Administrador Geral",
      texto: `
        Você possui acesso irrestrito ao sistema Agroverso.  
        <ul>
          <li>Gerenciar usuários e permissões</li>
          <li>Visualizar todos os relatórios, logs e dashboards</li>
          <li>Configurar e manter os sistemas inteligentes</li>
          <li>Auditar segurança, tokens e operações críticas</li>
        </ul>`
    },
    gerente: {
      titulo: "📊 Gerente",
      texto: `
        Visão estratégica e operacional do Agroverso.  
        <ul>
          <li>Coordenar equipes e aprovar relatórios</li>
          <li>Validar entregas, imagens e registros de campo</li>
          <li>Gerenciar fluxos operacionais entre líderes e técnicos</li>
          <li>Monitorar metas e indicadores</li>
        </ul>`
    },
    lider: {
      titulo: "🧭 Líder de Equipe",
      texto: `
        Você lidera a linha de frente.  
        <ul>
          <li>Distribuir ordens de serviço e organizar execuções</li>
          <li>Validar dados de campo e encaminhar relatórios</li>
          <li>Acompanhar sensores, ocorrências e atividades da equipe</li>
        </ul>`
    },
    tecnico: {
      titulo: "🔧 Técnico de Campo",
      texto: `
        Você executa e transforma dados em ação.  
        <ul>
          <li>Registrar imagens, vídeos e medições no campo</li>
          <li>Atualizar sensores e responder ordens de serviço</li>
          <li>Enviar relatórios operacionais diretamente pelo painel</li>
        </ul>`
    }
  };

  // ✅ Renderização dinâmica
  if (conteudos[perfil]) {
    const c = conteudos[perfil];
    mensagemEl.innerHTML = `<h2>${c.titulo}</h2><div class="perfil-texto">${c.texto}</div>`;
  } else {
    mensagemEl.innerHTML = `
      <h2>⚠️ Perfil não reconhecido</h2>
      <p>Não foi possível identificar seu perfil. <a href="login.html">Voltar ao login</a>.</p>`;
    subtitulo.textContent = "Erro de identificação do tipo de acesso.";
  }
});

// 🚪 Encerrar sessão com segurança
function sair() {
  sessionStorage.clear();
  window.location.href = "login.html";
}
