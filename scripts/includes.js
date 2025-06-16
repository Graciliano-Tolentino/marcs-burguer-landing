// ==========================================================================================
// 🔄 includes.js – Inclusão dinâmica de componentes HTML parciais (Marc’s Burguer)
// 🍔 Código modular e robusto com sincronização inteligente
// ==========================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll("[data-include]");

  const includesPromises = Array.from(elementos).map(async (elemento) => {
    const caminho = elemento.getAttribute("data-include");
    if (!caminho) return;

    try {
      const resposta = await fetch(caminho);
      if (!resposta.ok) throw new Error(`Erro ${resposta.status} – ${resposta.statusText}`);

      const conteudo = await resposta.text();
      elemento.innerHTML = conteudo;

      console.info(`[includes.js] ✅ Include carregado: ${caminho}`);

      // 🎯 Executa funções específicas se necessário futuramente
      if (caminho.includes("menu.html") && typeof window.initMenuLateral === "function") {
        window.initMenuLateral();
        console.info("[includes.js] ☰ initMenuLateral() executado após incluir menu.");
      }

    } catch (erro) {
      console.error(`[includes.js] ❌ Falha ao carregar '${caminho}':`, erro);
      elemento.innerHTML = `<!-- erro ao incluir ${caminho} -->`;
    }
  });

  // 🔁 Executa ações globais ao final de todos os includes
  Promise.all(includesPromises).then(() => {
    console.info("[includes.js] ✅ Todos os includes foram processados.");
  });
});
