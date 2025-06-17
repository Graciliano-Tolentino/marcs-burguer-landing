// =======================================================================================
// 🔐 menu-lateral.js – Exibição condicional do menu privado Agroverso
// 🌱 Adaptado para quando não há botão hamburguer, apenas login visual
// =======================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const perfil = sessionStorage.getItem("usuario_perfil");
  const menuPrivado = document.getElementById("menuPrivado");

  if (perfil && menuPrivado) {
    menuPrivado.hidden = false;
    console.info(`[Agroverso] 🔐 Menu privado exibido para perfil: '${perfil}'`);
  } else {
    console.info("[Agroverso] 🔐 Nenhum perfil encontrado. Menu privado oculto.");
  }
});
