// Marca no índice lateral (▸) a seção do artigo que está na tela.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'));

if (links.length && 'IntersectionObserver' in window) {
  const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const mark = (id: string) => {
    for (const a of links) a.removeAttribute('aria-current');
    byId.get(id)?.setAttribute('aria-current', 'true');
  };
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) mark(visible[0].target.id);
    },
    { rootMargin: '0px 0px -70% 0px' },
  );
  byId.forEach((_a, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

export {};
