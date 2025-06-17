// scripts/utils.js
// 🌱 Agroverso | Utilitários universais com sabedoria, força e beleza

const AgroUtils = (() => {
  'use strict';

  // 📧 Validação básica de e-mail (formato padrão)
  const validarEmail = (email = '') =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // 🧾 Validação de nome completo com acentos e mínimo de 2 letras
  const validarNome = (nome = '') =>
    /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(nome.trim());

  // 🎯 Validação de campo não vazio
  const naoVazio = (valor = '') =>
    String(valor).trim() !== '';

  // 🔔 Alerta acessível com fallback elegante
  const exibirAlerta = (mensagem = 'Mensagem não definida', tipo = 'info') => {
    if (typeof Toastify !== 'undefined' && typeof Toastify === 'function') {
      Toastify({
        text: mensagem,
        duration: 5000,
        gravity: 'top',
        position: 'center',
        backgroundColor: tipo === 'erro' ? '#d92f2f' : '#004225',
        stopOnFocus: true
      }).showToast();
    } else {
      alert(mensagem);
    }
  };

  // ✨ Capitaliza nomes próprios (respeitando preposições e conectores)
  const formatarNome = (nome = '') => {
    return nome
      .toLowerCase()
      .split(' ')
      .map(palavra =>
        ['da', 'de', 'do', 'dos', 'das', 'e'].includes(palavra)
          ? palavra
          : palavra.charAt(0).toUpperCase() + palavra.slice(1)
      )
      .join(' ');
  };

  // 🌿 Exporta funções úteis no escopo global AgroUtils
  return {
    validarEmail,
    validarNome,
    naoVazio,
    exibirAlerta,
    formatarNome
  };
})();
