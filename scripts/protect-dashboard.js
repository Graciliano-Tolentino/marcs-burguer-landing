// ======================================================================================
// 🛡️ scripts/protect-dashboard.js – Proteção do Painel do Agroverso
// 🚫 Impede acesso direto a dashboard.html sem sessão ativa
// ======================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const perfil = sessionStorage.getItem("usuario_perfil");
  const email = sessionStorage.getItem("usuario_email");

  // 🚫 Caso não haja dados válidos de sessão
  if (!perfil || !email) {
    alert("Sessão expirada ou acesso não autorizado. Faça login novamente.");
    window.location.href = "login.html";
  }
});
