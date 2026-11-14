// Filtros por área (e busca opcional) para listas: portfólio, vídeos e Training Log.
// Marcação esperada:
//   [data-filter]                       contêiner
//     button[data-filter-btn="AREA"]    botões (use "*" para todos)
//     input[data-filter-search]         busca (opcional)
//     [data-filter-count]               contador (opcional)
//     [data-filter-empty]               mensagem de vazio (opcional)
//     [data-filter-item][data-area][data-text]   itens
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-filter]').forEach((box) => {
  const buttons = Array.from(box.querySelectorAll<HTMLButtonElement>('[data-filter-btn]'));
  const items = Array.from(box.querySelectorAll<HTMLElement>('[data-filter-item]'));
  const search = box.querySelector<HTMLInputElement>('[data-filter-search]');
  const count = box.querySelector<HTMLElement>('[data-filter-count]');
  const empty = box.querySelector<HTMLElement>('[data-filter-empty]');
  let area = '*';
  let gen = 0;

  const apply = () => {
    const q = (search?.value ?? '').trim().toLowerCase();
    gen += 1;
    let shown = 0;
    for (const item of items) {
      const okArea = area === '*' || item.dataset.area === area;
      const okText = !q || (item.dataset.text ?? item.textContent ?? '').toLowerCase().includes(q);
      const visible = okArea && okText;
      item.hidden = !visible;
      item.classList.remove('re-0', 're-1');
      if (visible && !reduce) {
        item.style.animationDelay = `${Math.min(shown, 24) * 18}ms`;
        item.classList.add(gen % 2 ? 're-1' : 're-0');
      }
      if (visible) shown += 1;
    }
    if (count) count.textContent = `${shown} ${shown === 1 ? count.dataset.one ?? 'item' : count.dataset.many ?? 'itens'}`;
    if (empty) empty.hidden = shown > 0;
  };

  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      area = btn.dataset.filterBtn ?? '*';
      for (const b of buttons) b.setAttribute('aria-pressed', String(b === btn));
      apply();
    });
  }
  search?.addEventListener('input', apply);
});

export {};
