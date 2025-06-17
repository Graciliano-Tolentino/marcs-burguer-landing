// =======================================================================================
// ☰ menuLateral.js – Controle do Menu Hamburguer Agroverso
// 🌱 Compatível com includes.js e carregamento assíncrono
// =======================================================================================

function initMenuLateral() {
  const botaoToggle = document.querySelector(".menu-toggle");
  const menuLateral = document.getElementById("menuLateral");

  if (!botaoToggle || !menuLateral) {
    console.warn("[Agroverso] ⚠️ Botão ou menu lateral não encontrados no DOM.");
    return;
  }

  const classeAtivo = "aberto"; // alinhado com .menu-lateral.aberto do CSS

  const abrirMenu = () => {
    menuLateral.classList.add(classeAtivo);
    botaoToggle.setAttribute("aria-expanded", "true");
    menuLateral.setAttribute("aria-hidden", "false");
    menuLateral.focus();
  };

  const fecharMenu = () => {
    menuLateral.classList.remove(classeAtivo);
    botaoToggle.setAttribute("aria-expanded", "false");
    menuLateral.setAttribute("aria-hidden", "true");
    botaoToggle.focus();
  };

  const alternarMenu = () => {
    const estaAberto = menuLateral.classList.contains(classeAtivo);
    estaAberto ? fecharMenu() : abrirMenu();
  };

  // 🖱️ Clique no botão ☰
  botaoToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    alternarMenu();
  });

  // ❌ Fechar ao clicar fora
  document.addEventListener("click", (e) => {
    if (
      !menuLateral.contains(e.target) &&
      !botaoToggle.contains(e.target) &&
      menuLateral.classList.contains(classeAtivo)
    ) {
      fecharMenu();
    }
  });

  // ⌨️ Fecha com tecla Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuLateral.classList.contains(classeAtivo)) {
      fecharMenu();
    }
  });

  console.info("[Agroverso] ✅ Menu lateral ativado com sucesso.");
}

// 🌐 Torna a função acessível globalmente para includes.js
window.initMenuLateral = initMenuLateral;
