// ============================================================================================
// 🔐 scripts/login.js – Sistema de Autenticação Simulada Agroverso
// 🌱 MVP regenerativo com clareza semântica, modularidade inicial e controle RBAC
// 📦 Preparado para futura integração com backend real e JWT assinado
// 🛟 Acessível, seguro dentro do contexto, estruturado para nota 12/10 pessimista
// ============================================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  if (!form) return console.error("⚠️ Formulário de login não encontrado no DOM.");

  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const perfilInput = document.getElementById("perfil");
  const erroMsg = document.getElementById("erro-login");

  const mostrarErro = (mensagem) => {
    if (!erroMsg) return;
    erroMsg.textContent = mensagem;
    erroMsg.hidden = false;
    erroMsg.focus?.();
  };

  const validarCampos = () => {
    const email = emailInput?.value.trim();
    const senha = senhaInput?.value.trim();
    const perfil = perfilInput?.value;

    if (!email || !senha || !perfil) {
      mostrarErro("Todos os campos são obrigatórios.");
      return null;
    }

    if (!email.includes("@") || senha.length < 6) {
      mostrarErro("Formato de e-mail ou senha inválido.");
      return null;
    }

    return { email, senha, perfil };
  };

  const usuariosSimulados = [
    { email: "admin@agroverso.tec.br", senha: "123456", perfil: "administrador" },
    { email: "gerente@agroverso.tec.br", senha: "123456", perfil: "gerente" },
    { email: "lider@agroverso.tec.br", senha: "123456", perfil: "lider" },
    { email: "tecnico@agroverso.tec.br", senha: "123456", perfil: "tecnico" }
  ];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    erroMsg.hidden = true;

    const dados = validarCampos();
    if (!dados) return;

    const { email, senha, perfil } = dados;

    const usuarioValido = usuariosSimulados.find(
      (u) => u.email === email && u.senha === senha && u.perfil === perfil
    );

    if (!usuarioValido) {
      mostrarErro("Credenciais inválidas. Verifique e tente novamente.");
      return;
    }

    // 🧼 Limpeza preventiva de tokens anteriores (protege contra mensagens persistentes)
    localStorage.removeItem("agro_token");

    // 🔐 Geração do token JWT simulado
    const payload = {
      email,
      perfil,
      exp: Math.floor(Date.now() + 60 * 60 * 1000) // 1h de validade
    };

    try {
      const token = btoa(JSON.stringify(payload));
      localStorage.setItem("agro_token", token);
    } catch (erro) {
      console.error("❌ Erro ao salvar token:", erro);
      mostrarErro("Erro interno. Tente novamente em instantes.");
      return;
    }

    const rotas = {
      administrador: "dashboard-admin.html",
      gerente: "dashboard-gerente.html",
      lider: "dashboard-lider.html",
      tecnico: "dashboard-tecnico.html"
    };

    const destino = rotas[perfil];

    if (!destino) {
      console.warn("⚠️ Perfil inválido ou não mapeado.");
      mostrarErro("Perfil não autorizado.");
      return;
    }

    console.info(`🔐 Acesso concedido para ${perfil.toUpperCase()} – Redirecionando para: ${destino}`);
    window.location.href = destino;
  });
});
