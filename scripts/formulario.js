// scripts/formulario.js
// 🌿 Agroverso | Formulário regenerativo com sabedoria, força e beleza

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#orcamento-form');
    if (!form) return;

    const campos = {
      nome: form.querySelector('#nome'),
      email: form.querySelector('#email'),
      produto: form.querySelector('#produto')
    };

    const validarEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function validarCampos() {
      const nomeValido = campos.nome.value.trim().length >= 2;
      const emailValido = validarEmail(campos.email.value.trim());
      const produtoValido = campos.produto.value !== '';

      const erros = [];

      if (!nomeValido) erros.push(campos.nome);
      if (!emailValido) erros.push(campos.email);
      if (!produtoValido) erros.push(campos.produto);

      Object.entries(campos).forEach(([chave, campo]) => {
        const valido =
          (chave === 'nome' && nomeValido) ||
          (chave === 'email' && emailValido) ||
          (chave === 'produto' && produtoValido);
        campo.classList.toggle('erro', !valido);
        campo.setAttribute('aria-invalid', !valido);
      });

      if (erros.length > 0) {
        erros[0].focus();
        return false;
      }

      return true;
    }

    // 🎯 Remove marca de erro ao digitar
    Object.values(campos).forEach((campo) => {
      campo.addEventListener('input', () => {
        campo.classList.remove('erro');
        campo.removeAttribute('aria-invalid');
      });
    });

    // 🧭 Mapeamento semântico de produtos
    const produtoLabel = {
      irrigacao: 'Irrigação Inteligente',
      hidroponia: 'Hidroponia Inteligente',
      energia: 'Energia Solar Inteligente'
    };

    // ✉️ Submissão do formulário
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!validarCampos()) {
        alert('⚠️ Por favor, preencha todos os campos corretamente.');
        return;
      }

      const nome = campos.nome.value.trim();
      const email = campos.email.value.trim();
      const produto = campos.produto.value;
      const produtoNome = produtoLabel[produto] || 'Produto não especificado';

      const mensagem = `
Olá, equipe Agroverso! 🌿

Me chamo *${nome}* e estou interessado(a) em *${produtoNome}*.
Meu e-mail para contato é: *${email}*.

Aguardo retorno com um orçamento personalizado. Gratidão!
      `.trim();

      const url = `https://wa.me/5511963372373?text=${encodeURIComponent(mensagem)}`;

      alert('✅ Obrigado! Você será redirecionado ao WhatsApp para concluir o contato.');
      window.open(url, '_blank');
      form.reset();
    });
  });
})();
