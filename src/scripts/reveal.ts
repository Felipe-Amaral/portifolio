// Revela blocos [data-reveal] quando entram na tela (efeito "sistema ligando").
// Só esconde o que está abaixo da dobra no momento em que o script roda,
// então nada pisca e, sem JavaScript, o conteúdo aparece normalmente.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  const limit = window.innerHeight * 0.92;
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top > limit) {
      el.classList.add('is-pending');
      io.observe(el);
    }
  });
}

export {};
