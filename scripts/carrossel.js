// ===========================================================================================
// 📜 carrossel.js — Carrossel Inteligente com Modo Fullscreen Integrado (v2.0)
// 🍔 Swipe no mobile, botões flutuantes, acessibilidade total, fullscreen elegante
// ===========================================================================================

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const carrosseis = document.querySelectorAll('.carrossel');
    if (!carrosseis.length) return;

    carrosseis.forEach((carrossel, indice) => {
      const slides = carrossel.querySelectorAll('img');
      if (slides.length <= 1) return;

      let indiceAtual = 0;
      const idCarrossel = carrossel.id || `carrossel-${indice}`;
      carrossel.id = idCarrossel;

      // Criar botões de navegação
      const btnAnterior = document.createElement('button');
      btnAnterior.className = 'carrossel-controle carrossel-prev';
      btnAnterior.setAttribute('aria-label', 'Imagem anterior');
      btnAnterior.setAttribute('aria-controls', idCarrossel);
      btnAnterior.textContent = '‹';

      const btnProximo = document.createElement('button');
      btnProximo.className = 'carrossel-controle carrossel-next';
      btnProximo.setAttribute('aria-label', 'Próxima imagem');
      btnProximo.setAttribute('aria-controls', idCarrossel);
      btnProximo.textContent = '›';

      carrossel.append(btnAnterior, btnProximo);

      // Criar announcer acessível para leitores de tela
      const announcer = document.createElement('div');
      announcer.id = `announce-${idCarrossel}`;
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      carrossel.appendChild(announcer);

      // Configuração inicial dos slides
      slides.forEach((slide, i) => {
        slide.classList.add('transicao');
        slide.setAttribute('loading', 'lazy');
        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('role', 'tabpanel');

        // Ativação do modo fullscreen ao clicar na imagem
        slide.addEventListener('click', () => {
          const container = slide.closest('.carrossel-container');
          if (container) abrirCarrosselFullscreen(container);
        });
      });

      const mostrarSlide = (indice) => {
        slides.forEach((slide, i) => {
          const ativo = i === indice;
          slide.classList.toggle('ativo', ativo);
          slide.classList.toggle('inativo', !ativo);
          slide.setAttribute('aria-hidden', !ativo);
          slide.setAttribute('tabindex', ativo ? '0' : '-1');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        });

        announcer.textContent = `Slide ${indice + 1} de ${slides.length}`;
        slides[indice]?.focus?.();
      };

      btnAnterior.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
        mostrarSlide(indiceAtual);
      });

      btnProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % slides.length;
        mostrarSlide(indiceAtual);
      });

      mostrarSlide(indiceAtual);

      // Swipe para mobile
      let touchStartX = 0;
      let touchEndX = 0;

      carrossel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      carrossel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 30) btnProximo.click();
        if (touchEndX > touchStartX + 30) btnAnterior.click();
      });
    });
  });
})();

// ===========================================================================================
// 🖥️ Modo Fullscreen — Galeria Expandida Marc's Burguer com Clareza e Controle
// ===========================================================================================

(() => {
  let carrosselAtivo = null;
  let focoAnterior = null;

  window.abrirCarrosselFullscreen = function (container) {
    const carrossel = container.querySelector('.carrossel');
    if (!carrossel || carrossel.classList.contains('fullscreen')) return;

    focoAnterior = document.activeElement;
    carrossel.classList.add('fullscreen', 'transicao');
    void carrossel.offsetWidth; // Forçar repaint
    requestAnimationFrame(() => {
      carrossel.classList.add('ativo');
    });

    carrosselAtivo = carrossel;

    const botaoFechar = document.getElementById('fecharFullscreen');
    if (botaoFechar) {
      botaoFechar.hidden = false;
      botaoFechar.setAttribute('aria-hidden', 'false');
      setTimeout(() => botaoFechar.focus(), 150);
    }

    document.body.style.overflow = 'hidden';
  };

  window.fecharCarrosselFullscreen = function () {
    if (!carrosselAtivo) return;

    const carrossel = carrosselAtivo;
    carrossel.classList.remove('ativo');

    setTimeout(() => {
      carrossel.classList.remove('fullscreen');
      carrosselAtivo = null;

      const botaoFechar = document.getElementById('fecharFullscreen');
      if (botaoFechar) {
        botaoFechar.hidden = true;
        botaoFechar.setAttribute('aria-hidden', 'true');
      }

      document.body.style.overflow = '';
      focoAnterior?.focus?.();
    }, 250);
  };

  document.addEventListener('keydown', (event) => {
    if (!carrosselAtivo) return;

    switch (event.key) {
      case 'Escape':
        fecharCarrosselFullscreen();
        break;
      case 'ArrowRight':
        carrosselAtivo.querySelector('.carrossel-next')?.click();
        break;
      case 'ArrowLeft':
        carrosselAtivo.querySelector('.carrossel-prev')?.click();
        break;
    }
  });
})();

// ===========================================================================================
// 🌐 API Pública — Controle Externo do Carrossel (Modular e Expansível)
// ===========================================================================================

window.MarcsBurguerCarrossel = {
  next(id) {
    document.querySelector(`#${id} .carrossel-next`)?.click();
  },
  prev(id) {
    document.querySelector(`#${id} .carrossel-prev`)?.click();
  },
  goTo(id, index) {
    const carrossel = document.getElementById(id);
    if (!carrossel) return;

    const slides = carrossel.querySelectorAll('img');
    if (!slides.length || index < 0 || index >= slides.length) return;

    const btnAnterior = carrossel.querySelector('.carrossel-prev');
    const btnProximo = carrossel.querySelector('.carrossel-next');

    let contador = 0;
    const intervalo = setInterval(() => {
      const atual = Array.from(slides).findIndex((el) => el.classList.contains('ativo'));
      if (atual === index) return clearInterval(intervalo);

      if (index > atual) btnProximo?.click();
      else btnAnterior?.click();

      if (++contador > slides.length * 2) clearInterval(intervalo);
    }, 100);
  },
  openFullscreen(id) {
    const container = document.querySelector(`#${id}`)?.closest('.carrossel-container');
    if (container) abrirCarrosselFullscreen(container);
  },
  closeFullscreen() {
    fecharCarrosselFullscreen();
  }
};
