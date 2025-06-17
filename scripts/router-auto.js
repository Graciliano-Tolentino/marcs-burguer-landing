// =======================================================================================
// 🔁 router-auto.js – Redirecionamento com atraso, mensagem amigável e elegância Agroverso
// =======================================================================================

(() => {
  try {
    const perfil = sessionStorage.getItem("usuario_perfil");
    const email = sessionStorage.getItem("usuario_email");

    if (!perfil || !email) return;

    const rotas = {
      administrador: "dashboard-admin.html",
      gerente: "dashboard-gerente.html",
      lider: "dashboard-lider.html",
      tecnico: "dashboard-tecnico.html"
    };

    const destino = rotas[perfil.toLowerCase()] || "dashboard.html";
    const atual = window.location.pathname.toLowerCase();

    if (!atual.includes("dashboard")) {
      // 🌀 Cria overlay visual e mensagem
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        font-family: 'Segoe UI', sans-serif;
        z-index: 9999;
        text-align: center;
      `;

      overlay.innerHTML = `
        <div class="mensagem-rotativa">
          <h2>🔒 Sessão detectada</h2>
          <p>Redirecionando para seu painel personalizado, ${perfil}...</p>
          <div style="margin-top: 1rem;">
            <span class="spinner" style="
              display:inline-block;
              width: 2rem;
              height: 2rem;
              border: 3px solid white;
              border-top-color: transparent;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            "></span>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      // 💫 Animação CSS para o spinner
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);

      // ⏳ Aguarda 1 segundo e redireciona
      setTimeout(() => {
        window.location.href = destino;
      }, 1000);
    }
  } catch (erro) {
    console.warn("[Agroverso] router-auto.js falhou:", erro);
  }
})();

// =======================================================================================
// 📦 Inclusão automática de cabeçalhos e rodapés com base em data-include
// =======================================================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const resp = await fetch(file);
      if (resp.ok) {
        el.innerHTML = await resp.text();
      } else {
        console.warn(`Erro ao carregar include: ${file}`);
      }
    } catch (err) {
      console.error(`Falha ao incluir arquivo: ${file}`, err);
    }
  });
});
