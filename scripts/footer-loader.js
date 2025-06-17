// =============================================================================
// 📥 footer-loader.js – Carregamento dinâmico do rodapé institucional Agroverso
// 🌿 Refinado para clareza, robustez e integração semântica
// =============================================================================

(() => {
  // 🧠 Encapsula o código para evitar colisões no escopo global
  document.addEventListener("DOMContentLoaded", () => {
    const placeholder = document.querySelector('[data-include="footer"]');

    if (!placeholder) return; // 🚫 Sem placeholder = sem carregamento

    fetch("partials/footer.html")
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
        console.info("✅ Rodapé Agroverso carregado com sucesso.");
      })
      .catch(error => {
        console.warn("⚠️ Falha ao carregar rodapé institucional:", error.message);
      });
  });
})();
