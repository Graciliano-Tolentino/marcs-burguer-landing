// ============================================================================================
// 🛡️ scripts/auth.js – Proteção de Páginas Privadas Agroverso
// 🌱 Segurança regenerativa com controle RBAC, token supervisionado e feedback empático
// 🔒 Estrutura modular, auditável e preparada para produção real
// ============================================================================================

(() => {
  'use strict'; // 🔐 Segurança adicional no escopo isolado

  // 🎯 Página padrão de login
  const loginPage = "login.html";

  // 🔁 Função de redirecionamento universal
  const redirecionarParaLogin = (mensagem = "Sessão encerrada ou inválida. Faça login novamente.") => {
    alert(`⚠️ ${mensagem}`);
    window.location.href = loginPage;
  };

  // 🔐 Captura do token salvo no navegador
  const token = localStorage.getItem("agro_token");

  if (!token) {
    console.warn("[Agroverso] 🔐 Nenhum token encontrado. Redirecionando.");
    return redirecionarParaLogin();
  }

  let payload;

  try {
    // 📜 Decodifica o token simulado (base64 → JSON)
    payload = JSON.parse(atob(token));
  } catch (erro) {
    console.error("❌ Token corrompido ou malformado:", erro);
    localStorage.removeItem("agro_token");
    return redirecionarParaLogin("Erro ao validar sessão. Faça login novamente.");
  }

  const { email, perfil, exp } = payload;

  if (!email || !perfil || !exp) {
    console.warn("[Agroverso] ⚠️ Token incompleto ou inválido.");
    localStorage.removeItem("agro_token");
    return redirecionarParaLogin("Sessão inválida. Faça login novamente.");
  }

  // ⌛ Verificação de expiração
  if (Date.now() > exp) {
    console.warn("[Agroverso] ⏳ Token expirado.");
    localStorage.removeItem("agro_token");
    return redirecionarParaLogin("Sua sessão expirou. Por favor, faça login novamente.");
  }

  // 🗺️ Mapeamento de rotas autorizadas por perfil
  const rotasPermitidas = {
    administrador: "dashboard-admin.html",
    gerente: "dashboard-gerente.html",
    lider: "dashboard-lider.html",
    tecnico: "dashboard-tecnico.html"
  };

  const rotaEsperada = rotasPermitidas[perfil];

  if (!rotaEsperada) {
    console.error(`[Agroverso] ❌ Perfil '${perfil}' não reconhecido nas rotas autorizadas.`);
    return redirecionarParaLogin("Perfil inválido. Acesso negado.");
  }

  // 🌐 Página atual sanitizada
  const paginaAtual = window.location.pathname.split("/").pop();

  if (paginaAtual !== rotaEsperada) {
    console.warn(`[Agroverso] 🚫 Perfil '${perfil}' tentou acessar '${paginaAtual}', permitido apenas '${rotaEsperada}'.`);
    return redirecionarParaLogin("Acesso restrito. Perfil não autorizado para esta página.");
  }

  // ✅ Se chegou até aqui, o acesso está liberado
  console.info(`✅ [Agroverso] Acesso autorizado para '${perfil.toUpperCase()}' (${email})`);
  console.info(`📄 Página atual: ${paginaAtual} | Perfil esperado: ${rotaEsperada}`);

  // 🔄 Tornar perfil e e-mail disponíveis para uso na página (se desejado)
  window.usuarioAgroverso = { email, perfil };

})();
