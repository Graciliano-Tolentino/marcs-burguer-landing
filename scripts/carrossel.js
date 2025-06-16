// ===========================================================================================
// 📜 carrossel-v4.js — Versão Completa com Prefetch, IntersectionObserver, Loop Infinito e Analytics
// ===========================================================================================

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const carrosseis = document.querySelectorAll('.carrossel');
    if (!carrosseis.length) return;

    carrosseis.forEach((carrossel, indice) => {
      let slides = carrossel.querySelectorAll('img');
      if (slides.length <= 1) return;

      let indiceAtual = 0;
      const idCarrossel = carrossel.id || `carrossel-${indice}`;
      carrossel.id = idCarrossel;

      carrossel.setAttribute('role', 'region');
      carrossel.setAttribute('aria-label', 'Galeria de imagens promocionais');
      carrossel.setAttribute('aria-roledescription', 'carousel');

      // Clones para loop infinito
      const primeiroClone = slides[0].cloneNode(true);
      const ultimoClone = slides[slides.length - 1].cloneNode(true);
      carrossel.appendChild(primeiroClone);
      carrossel.insertBefore(ultimoClone, slides[0]);

      slides = carrossel.querySelectorAll('img');

      // Botões
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

      // Indicadores
      const indicadores = document.createElement('div');
      indicadores.className = 'carrossel-indicadores';
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'indicador';
        dot.setAttribute('data-slide', i);
        indicadores.appendChild(dot);
      });
      carrossel.appendChild(indicadores);

      // Anúncio acessível
      const announcer = document.createElement('div');
      announcer.id = `announce-${idCarrossel}`;
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      carrossel.appendChild(announcer);

      // Slides
      slides.forEach((slide, i) => {
        slide.classList.add('transicao', 'fade');
        slide.setAttribute('loading', 'lazy');
        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-hidden', 'true');

        if (!slide.getAttribute('src')) {
          slide.setAttribute('data-src', slide.src);
          slide.removeAttribute('src');
        }

        slide.addEventListener('click', () => {
          const container = slide.closest('.carrossel-container');
          if (container) abrirCarrosselFullscreen(container);
        });
      });

      // Prefetch inteligente
      const prefetchSlide = (i) => {
        const slide = slides[i];
        if (!slide || slide.dataset.prefetched) return;
        const src = slide.getAttribute('data-src');
        if (src) {
          const img = new Image();
          img.src = src;
          slide.setAttribute('src', src);
          slide.dataset.prefetched = 'true';
        }
      };

      const mostrarSlide = (indice) => {
        slides.forEach((slide, i) => {
          const ativo = i === indice;
          slide.classList.toggle('ativo', ativo);
          slide.classList.toggle('inativo', !ativo);
          slide.setAttribute('aria-hidden', !ativo);
          slide.setAttribute('tabindex', ativo ? '0' : '-1');
          slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        });

        carrossel.querySelectorAll('.indicador').forEach((dot, i) => {
          dot.classList.toggle('ativo', i === indice);
        });

        announcer.textContent = `Slide ${indice + 1} de ${slides.length}`;
        slides[indice]?.focus?.();
        prefetchSlide(indice + 1);

        carrossel.dispatchEvent(new CustomEvent('slideChange', {
          detail: { index: indice, id: carrossel.id }
        }));
      };

      btnAnterior.addEventListener('click', () => {
        indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
        mostrarSlide(indiceAtual);
      });

      btnProximo.addEventListener('click', () => {
        indiceAtual = (indiceAtual + 1) % slides.length;
        mostrarSlide(indiceAtual);
      });

      indicadores.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicador')) {
          indiceAtual = parseInt(e.target.getAttribute('data-slide'));
          mostrarSlide(indiceAtual);
        }
      });

      mostrarSlide(indiceAtual);

      // Swipe
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

      // Autoplay com IntersectionObserver
      const autoplayDelay = parseInt(carrossel.dataset.autoplayDelay || '7000');
      let autoplay = carrossel.dataset.autoplay === 'true';
      let autoplayInterval;

      const iniciarAutoPlay = () => {
        if (!autoplay) return;
        autoplayInterval = setInterval(() => btnProximo.click(), autoplayDelay);
      };

      const pararAutoPlay = () => clearInterval(autoplayInterval);

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) iniciarAutoPlay();
        else pararAutoPlay();
      }, { threshold: 0.5 });

      observer.observe(carrossel);
    });
  });
})();

// ===========================================================================================
// 🖥️ fullscreen-v4.js — Modo Imersivo com Acessibilidade Avançada e Isolamento Visual
// ===========================================================================================

(() => {
  let carrosselAtivo = null;
  let focoAnterior = null;
  let elementosInertes = [];

  window.abrirCarrosselFullscreen = function (container) {
    const carrossel = container.querySelector('.carrossel');
    if (!carrossel || carrossel.classList.contains('fullscreen')) return;

    focoAnterior = document.activeElement;

    // 🔒 Isolar visualmente os demais elementos da página
    elementosInertes = Array.from(document.body.children).filter(el => !container.contains(el));
    elementosInertes.forEach(el => el.setAttribute('inert', 'true'));

    // 🎞️ Ativar visualmente o modo fullscreen
    carrossel.classList.add('fullscreen', 'transicao');
    void carrossel.offsetWidth;
    requestAnimationFrame(() => {
      carrossel.classList.add('ativo');
    });

    // ♿️ Acessibilidade modal
    carrossel.setAttribute('aria-modal', 'true');
    carrossel.setAttribute('role', 'dialog');
    carrosselAtivo = carrossel;

    // 🧭 Botão de fechar
    const botaoFechar = document.getElementById('fecharFullscreen');
    if (botaoFechar) {
      botaoFechar.hidden = false;
      botaoFechar.setAttribute('aria-hidden', 'false');
      botaoFechar.setAttribute('tabindex', '0');
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
      carrossel.removeAttribute('aria-modal');
      carrossel.removeAttribute('role');
      carrosselAtivo = null;

      // 🔓 Reativar o conteúdo externo
      elementosInertes.forEach(el => el.removeAttribute('inert'));
      elementosInertes = [];

      const botaoFechar = document.getElementById('fecharFullscreen');
      if (botaoFechar) {
        botaoFechar.hidden = true;
        botaoFechar.setAttribute('aria-hidden', 'true');
        botaoFechar.setAttribute('tabindex', '-1');
      }

      document.body.style.overflow = '';
      focoAnterior?.focus?.();
    }, 250);
  };

  // ⌨️ Controles de teclado
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
// 🌐 api-v4.js — API Pública Completa para Controle Modular do Carrossel
// ===========================================================================================

window.MarcsBurguerCarrossel = {
  next(id) {
    const nextBtn = document.querySelector(`#${id} .carrossel-next`);
    nextBtn?.click();
    this._dispatchSlideChange(id);
  },

  prev(id) {
    const prevBtn = document.querySelector(`#${id} .carrossel-prev`);
    prevBtn?.click();
    this._dispatchSlideChange(id);
  },

  goTo(id, index) {
    const carrossel = document.getElementById(id);
    if (!carrossel) return;

    const slides = carrossel.querySelectorAll('img');
    if (!slides.length || index < 0 || index >= slides.length) return;

    const atual = Array.from(slides).findIndex(el => el.classList.contains('ativo'));
    const btnProximo = carrossel.querySelector('.carrossel-next');
    const btnAnterior = carrossel.querySelector('.carrossel-prev');

    let tentativas = 0;
    const intervalo = setInterval(() => {
      const novoAtual = Array.from(slides).findIndex(el => el.classList.contains('ativo'));
      if (novoAtual === index) {
        clearInterval(intervalo);
        MarcsBurguerCarrossel._dispatchSlideChange(id);
        return;
      }

      if (index > novoAtual) btnProximo?.click();
      else btnAnterior?.click();

      if (++tentativas > slides.length * 2) clearInterval(intervalo);
    }, 100);
  },

  openFullscreen(id) {
    const container = document.querySelector(`#${id}`)?.closest('.carrossel-container');
    if (container) abrirCarrosselFullscreen(container);
  },

  closeFullscreen() {
    fecharCarrosselFullscreen();
  },

  onSlideChange(id, callback) {
    const carrossel = document.getElementById(id);
    if (!carrossel) return;
    carrossel.addEventListener('slideChange', callback);
  },

  _dispatchSlideChange(id) {
    const carrossel = document.getElementById(id);
    if (!carrossel) return;

    const index = Array.from(carrossel.querySelectorAll('img')).findIndex(el =>
      el.classList.contains('ativo')
    );

    carrossel.dispatchEvent(new CustomEvent('slideChange', {
      detail: { index, id }
    }));
  }
};

