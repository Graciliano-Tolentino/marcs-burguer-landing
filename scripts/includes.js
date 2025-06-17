// ==========================================================================================
// 🔄 includes.js – Inclusão dinâmica de componentes HTML parciais (Agroverso)
// 🌱 Versão refinada com sincronização inteligente e execução modular pós-carregamento
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

      // 🎯 Executa initMenuLateral() se o include for do menu
      if (caminho.includes("menu.html") && typeof window.initMenuLateral === "function") {
        window.initMenuLateral();
        console.info("[includes.js] ☰ initMenuLateral() executado após incluir menu.");
      }

    } catch (erro) {
      console.error(`[includes.js] ❌ Falha ao carregar '${caminho}':`, erro);
      elemento.innerHTML = `<!-- erro ao incluir ${caminho} -->`;
    }
  });

  // 🔁 Executa ações globais ao final de todos os includes (se necessário futuramente)
  Promise.all(includesPromises).then(() => {
    console.info("[includes.js] ✅ Todos os includes foram processados.");
  });
});
