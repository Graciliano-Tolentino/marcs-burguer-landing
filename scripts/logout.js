// ============================================================================================
// 🚪 scripts/logout.js – Encerramento de Sessão Agroverso
// 🌿 Clareza emocional, segurança ética, transição regenerativa e empatia institucional
// ============================================================================================

(function logoutAgroversoModule() {
  'use strict'; // 🔒 Segurança no escopo isolado

  // 🎯 Redirecionamento após logout
  const URL_DESTINO = "logout.html";

  // 🔍 Aplica atributos de acessibilidade a todos os botões de logout
  document.addEventListener("DOMContentLoaded", () => {
    const botoesLogout = document.querySelectorAll('[data-logout], [onclick="logout()"]');

    if (botoesLogout.length === 0) {
      console.warn("[Agroverso] ⚠️ Nenhum botão de logout encontrado.");
      return;
    }

    botoesLogout.forEach((btn) => {
      btn.setAttribute("aria-label", "Encerrar sessão com segurança");
      btn.setAttribute("title", "Clique para sair do sistema Agroverso");
    });
  });

  /**
   * 🔚 logout – Função global institucional de encerramento de sessão
   */
  window.logout = function () {
    const confirmar = confirm(
      "Tem certeza que deseja encerrar sua sessão no Agroverso?\n\nVocê poderá fazer login novamente a qualquer momento."
    );

    if (!confirmar) {
      console.info("[Agroverso] 🚫 Logout cancelado pelo usuário.");
      return;
    }

    // 🧼 Limpeza ética dos dados de sessão
    const chaves = ["agro_token", "usuario_perfil", "usuario_email"];
    chaves.forEach((chave) => {
      localStorage.removeItem(chave);
      sessionStorage.removeItem(chave);
    });

    // 📢 Confirmação emocional e regenerativa
    alert(
      "🌿 Sessão encerrada com sucesso.\n\n" +
      "Agradecemos por fazer parte do Agroverso.\n" +
      "Continue cultivando sabedoria, força e beleza."
    );

    // ⏳ Pequeno delay para assimilação
    setTimeout(() => {
      window.location.href = URL_DESTINO;
    }, 1200);
  };

})(); // 🔚 Final do módulo logoutAgroversoModule
