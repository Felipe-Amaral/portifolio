// Executa o callback uma única vez, quando o elemento entra na tela.
// Sem IntersectionObserver, executa de imediato (o conteúdo nunca fica preso).
export function onVisible(el: Element, cb: () => void, threshold = 0.2): void {
  if (!('IntersectionObserver' in window)) {
    cb();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      io.disconnect();
      cb();
    },
    { threshold },
  );
  io.observe(el);
}
