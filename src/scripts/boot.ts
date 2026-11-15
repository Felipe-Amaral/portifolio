// Boot do terminal: cada comando ("$ ...") é digitado tecla a tecla, com pequena variação de ritmo,
// a saída aparece logo depois e há uma pausa antes do próximo comando. O cursor fica piscando no fim.
// Ao passar o mouse sobre a foto, a digitação roda de novo, igual ao carregamento da página.
// O HTML já vem com o texto completo; sem JavaScript ou com movimento reduzido, nada muda.
import { onVisible } from './visible';

const START = 450; // atraso antes do primeiro comando
const TYPE_CMD = 75; // ms por tecla digitada num comando (base, com variação)
const TYPE_OUT = 14; // ms por caractere na saída
const AFTER_CMD = 320; // pausa depois de apertar Enter (saída aparece)
const BETWEEN = 650; // pausa entre um bloco e o próximo comando

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
// Tempo de tecla "humano": base ± 40%, e um pouco mais de pausa após espaço.
const keyDelay = (base: number, ch: string) => base * (0.6 + Math.random() * 0.8) + (ch === ' ' ? 25 : 0);

interface Part {
  line: HTMLElement;
  isCmd: boolean;
  head: string;
  hlText: string;
}

async function typeInto(node: Text, target: HTMLElement | null, text: string, base: number) {
  for (const ch of text) {
    await sleep(keyDelay(base, ch));
    if (target) target.textContent += ch;
    else node.data += ch;
  }
}

async function run(parts: Part[], cursor: HTMLElement | null) {
  // Esconde tudo antes de começar, para a segunda execução não mostrar o texto antigo.
  parts.forEach((p) => (p.line.hidden = true));
  await sleep(START);

  for (let idx = 0; idx < parts.length; idx++) {
    const { line, isCmd, head, hlText } = parts[idx]!;

    line.textContent = '';
    const a = document.createTextNode('');
    line.append(a);
    let b: HTMLElement | null = null;
    if (hlText) {
      b = document.createElement('span');
      b.className = 'ok';
      line.append(b);
    }
    line.hidden = false;
    if (cursor) line.append(cursor);

    const base = isCmd ? TYPE_CMD : TYPE_OUT;
    await typeInto(a, null, head, base);
    if (b) await typeInto(a, b, hlText, base);

    if (isCmd) {
      await sleep(AFTER_CMD);
    } else if (parts[idx + 1]?.isCmd) {
      // Saída seguida de um novo comando: pausa antes de digitar.
      await sleep(BETWEEN);
    }
  }
}

if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-boot]').forEach((term) => {
    const cursor = term.querySelector<HTMLElement>('.cursor');
    cursor?.remove();

    // Guarda o texto original de cada linha, para poder digitar de novo.
    const parts: Part[] = Array.from(term.querySelectorAll<HTMLElement>('[data-line]')).map((line) => {
      const hl = line.querySelector<HTMLElement>('.ok');
      const full = line.textContent ?? '';
      const hlText = hl?.textContent ?? '';
      return {
        line,
        isCmd: line.classList.contains('cmd'),
        head: hl ? full.slice(0, full.length - hlText.length) : full,
        hlText,
      };
    });

    let live = false;
    let busy = false;
    const play = () => {
      if (busy) return;
      busy = true;
      void run(parts, cursor).then(() => {
        // Fim: o cursor continua piscando na última linha, esperando o próximo comando.
        if (cursor) parts[parts.length - 1]?.line.append(cursor);
        busy = false;
      });
    };

    // Só começa quando o terminal entra na tela (no mobile ele pode estar abaixo da dobra).
    onVisible(term, () => {
      live = true;
      play();
    });

    // Passar o mouse sobre a foto repete a digitação, como no carregamento.
    const area = term.closest<HTMLElement>('.photo') ?? term;
    area.addEventListener('mouseenter', () => {
      if (live) play();
    });
  });
}

export {};
