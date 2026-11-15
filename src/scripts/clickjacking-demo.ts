// Demo de clickjacking. O HTML já vem no passo 1; este arquivo só adiciona o comportamento.
// - Os botões escolhem o passo (data-step no palco e na explicação).
// - Passo 2 é uma sequência de cenas (data-cena): separar camadas, juntar e tornar o banco invisível,
//   clicar no prêmio, confirmar o pagamento. Toca sozinha uma vez quando a demo entra na tela.
// - Com prefers-reduced-motion, não há sequência: o passo 2 mostra direto o estado final.
// Sem atributos inline no HTML: só data-* e aria-*, lidos pelo CSS.

const root = document.querySelector<HTMLElement>('[data-cj]');
const stage = root?.querySelector<HTMLElement>('.cj__stage');
const botoes = root ? [...root.querySelectorAll<HTMLButtonElement>('.cj__step')] : [];
const textos = root ? [...root.querySelectorAll<HTMLElement>('.cj__explica')] : [];
const textoPasso2 = root?.querySelector<HTMLElement>('.cj__explica[data-step="2"]');

const LEGENDAS: Record<string, string> = {
  pre: 'Camadas separadas: por cima, a página do banco, transparente e alinhada ao botão do prêmio.',
  a: 'Camadas separadas: por cima, a página do banco, transparente e alinhada ao botão do prêmio.',
  b: 'As camadas se juntam. O banco fica invisível (opacity: 0), e a vítima não percebe nada.',
  c: 'O cursor clica em "Resgatar meu prêmio", mas o clique atravessa a camada e atinge "Confirmar pagamento".',
  d: 'O banco confirma a transferência. A vítima acha que resgatou um prêmio.',
};

// Tempos das cenas do passo 2 (ms a partir do início da sequência).
const CENAS: Array<[string, number]> = [
  ['a', 60],
  ['b', 3200],
  ['c', 4500],
  ['d', 5800],
];

if (root && stage && botoes.length > 0) {
  root.classList.add('is-live');

  const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers: number[] = [];
  let interagiu = false;

  const cancelarCenas = () => {
    timers.forEach((id) => window.clearTimeout(id));
    timers = [];
  };

  const setCena = (cena: string) => {
    stage.dataset.cena = cena;
    if (textoPasso2) textoPasso2.textContent = LEGENDAS[cena] ?? LEGENDAS.a;
  };

  const sequenciaPasso2 = () => {
    cancelarCenas();
    setCena('pre');
    if (reduzirMovimento) {
      setCena('d');
      return;
    }
    CENAS.forEach(([cena, atraso]) => {
      timers.push(window.setTimeout(() => setCena(cena), atraso));
    });
  };

  const mostrar = (passo: number) => {
    stage.dataset.step = String(passo);
    botoes.forEach((botao) => {
      botao.setAttribute('aria-pressed', String(Number(botao.dataset.step) === passo));
    });
    textos.forEach((texto) => {
      texto.hidden = Number(texto.dataset.step) !== passo;
    });
    if (passo === 2) {
      sequenciaPasso2();
    } else {
      cancelarCenas();
      setCena('pre');
    }
  };

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      interagiu = true;
      mostrar(Number(botao.dataset.step));
    });
  });

  // Toca uma vez, quando a demo entra na tela, e depois fica onde o leitor escolher.
  if (!reduzirMovimento && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        if (interagiu || !entradas.some((entrada) => entrada.isIntersecting)) return;
        observador.disconnect();
        timers.push(window.setTimeout(() => {
          if (!interagiu) mostrar(2);
        }, 800));
      },
      { threshold: 0.4 },
    );
    observador.observe(root);
  }
}

export {};
