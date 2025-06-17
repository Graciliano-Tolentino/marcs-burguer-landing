// =========================================================================================
// 🔁 router.js – Redirecionamento por Perfil de Usuário Agroverso
// 🌿 Modular, seguro, acessível e expansível
// =========================================================================================

function redirecionarPorPerfil(perfil) {
  if (!perfil || typeof perfil !== "string") {
    console.warn("[Agroverso] Perfil inválido para redirecionamento.");
    window.location.href = "dashboard.html"; // Fallback
    return;
  }

  const destino = {
    administrador: "dashboard-admin.html",
    gerente: "dashboard-gerente.html",
    lider: "dashboard-lider.html",
    tecnico: "dashboard-tecnico.html"
  };

  const caminho = destino[perfil.toLowerCase()] || "dashboard.html";

  console.info(`[Agroverso] Redirecionando perfil '${perfil}' para: ${caminho}`);
  window.location.href = caminho;
}
