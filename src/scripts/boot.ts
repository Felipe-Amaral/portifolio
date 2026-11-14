// Boot sequence: o terminal "digita" as linhas (motion-type: 12 ms por caractere, início em 450 ms).
// O HTML já vem com o texto completo; sem JavaScript ou com movimento reduzido, nada muda.
import { onVisible } from './visible';

const SPEED = 12;
const START = 450;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-boot]').forEach((term) => {
  if (reduce) return;
  const lines = Array.from(term.querySelectorAll<HTMLElement>('[data-line]'));
  const cursor = term.querySelector<HTMLElement>('.cursor');
  cursor?.remove();
  const parts = lines.map((line) => {
    const hl = line.querySelector<HTMLElement>('.ok');
    const full = line.textContent ?? '';
    const hlText = hl?.textContent ?? '';
    const head = hl ? full.slice(0, full.length - hlText.length) : full;
    line.textContent = '';
    const a = document.createTextNode('');
    line.append(a);
    let b: HTMLElement | null = null;
    if (hl) {
      b = document.createElement('span');
      b.className = 'ok';
      line.append(b);
    }
    line.hidden = true;
    return { line, a, b, head, hlText };
  });

  let i = 0;
  let c = 0;
  const step = () => {
    const p = parts[i];
    if (!p) return;
    p.line.hidden = false;
    if (cursor) p.line.append(cursor);
    const total = p.head.length + p.hlText.length;
    c += 1;
    p.a.data = p.head.slice(0, c);
    if (p.b) p.b.textContent = c > p.head.length ? p.hlText.slice(0, c - p.head.length) : '';
    if (c >= total) {
      i += 1;
      c = 0;
    }
    if (i < parts.length) window.setTimeout(step, SPEED);
  };
  // Só começa a digitar quando o terminal entra na tela (no mobile ele pode estar abaixo da dobra).
  onVisible(term, () => window.setTimeout(step, START));
});

export {};
