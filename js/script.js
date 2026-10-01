/* Odontologia Horibe — interações progressivas, sem dependências. */
(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const mobile = window.matchMedia('(max-width: 1023px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Sem JavaScript, a navegação permanece visível e todos os CTAs funcionam.
  document.documentElement.classList.add('js');
  toggle.hidden = false;

  function closeMenu(returnFocus = false) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('.menu-label').textContent = 'Menu';
    header.classList.remove('menu-open');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-label').textContent = open ? 'Fechar' : 'Menu';
    header.classList.toggle('menu-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('pointerdown', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  header.addEventListener('focusout', event => {
    if (!header.contains(event.relatedTarget)) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());

  // Uma atualização por frame, sem animação contínua ligada à rolagem.
  let pending = false;
  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    pending = false;
  }
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; window.requestAnimationFrame(updateHeader); }
  }, { passive: true });
  updateHeader();

  // O conteúdo permanece visível se IntersectionObserver não estiver disponível.
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) {
        document.querySelectorAll('.reveal-ready').forEach(element => element.classList.add('is-visible'));
        observer.disconnect();
      }
    });
  }

  // Adicione data-lightbox a um link para uma fotografia real para ampliá-la.
  const dialog = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  let trigger;
  document.querySelectorAll('a[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      trigger = link;
      const image = link.querySelector('img');
      lightboxImage.src = link.href;
      lightboxImage.alt = image?.alt || link.dataset.caption || 'Fotografia da clínica';
      document.querySelector('#lightbox-caption').textContent = link.dataset.caption || image?.alt || '';
      dialog.showModal();
      document.body.classList.add('lightbox-open');
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    trigger?.focus();
  });

  // Ano atual; nenhum contato, cookie ou dado de paciente é armazenado.
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
