// Podcast player — melhora progressiva do <audio> nativo.
// Sem este script, o player nativo e o link de download continuam funcionando.
// Nada de inline: o progresso vai em --p via CSSOM (element.style.setProperty), permitido pela CSP.

type Estado = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

const STATUS: Record<Estado, string> = {
  idle: '[ ] PRONTO PARA OUVIR',
  loading: '[~] CARREGANDO...',
  playing: '● TOCANDO',
  paused: '[||] PAUSADO',
  ended: '[+] FIM DO EPISÓDIO',
  error: '[!] NÃO FOI POSSÍVEL CARREGAR. USE O LINK PARA BAIXAR',
};

const formatar = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '--:--';
  const total = Math.floor(s);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const seg = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${seg}` : `${String(m).padStart(2, '0')}:${seg}`;
};

document.querySelectorAll<HTMLElement>('[data-pod]').forEach((root) => {
  const audio = root.querySelector<HTMLAudioElement>('audio');
  const ui = root.querySelector<HTMLElement>('.pod__ui');
  const play = root.querySelector<HTMLButtonElement>('.pod__play');
  const seek = root.querySelector<HTMLInputElement>('.pod__seek');
  const cur = root.querySelector<HTMLElement>('[data-pod-cur]');
  const dur = root.querySelector<HTMLElement>('[data-pod-dur]');
  const status = root.querySelector<HTMLElement>('[data-pod-status]');
  const speed = root.querySelector<HTMLFieldSetElement>('[data-pod-speed]');
  if (!audio || !ui || !play || !seek || !cur || !dur || !status) return;

  // Ativa a interface customizada e esconde a nativa.
  root.classList.add('pod--js');
  ui.hidden = false;
  if (speed) speed.hidden = false;
  audio.controls = false;

  const duracaoInicial = root.dataset.duracao?.trim();
  if (duracaoInicial) dur.textContent = duracaoInicial;

  let arrastando = false;
  let posicaoPendente: number | null = null; // fração 0–1 escolhida antes de o áudio carregar
  let velocidade = 1;

  const setEstado = (estado: Estado) => {
    if (root.dataset.state === estado) return;
    root.dataset.state = estado;
    status.textContent = STATUS[estado];
    play.setAttribute('aria-label', estado === 'playing' ? 'Pausar podcast' : 'Reproduzir podcast');
  };

  const duracao = () => (Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0);

  const pintar = (fracao: number) => {
    const f = Math.min(1, Math.max(0, fracao));
    root.style.setProperty('--p', `${(f * 100).toFixed(2)}%`);
    const d = duracao();
    const t = d ? f * d : 0;
    cur.textContent = formatar(t);
    seek.value = String(Math.round(f * 1000));
    seek.setAttribute('aria-valuetext', `${formatar(t)} de ${d ? formatar(d) : dur.textContent ?? '--:--'}`);
  };

  const atualizar = () => {
    if (arrastando) return;
    const d = duracao();
    pintar(d ? audio.currentTime / d : 0);
  };

  play.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
      setEstado('loading');
      audio.playbackRate = velocidade;
      audio.play().catch(() => setEstado(audio.error ? 'error' : 'paused'));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('waiting', () => setEstado('loading'));
  audio.addEventListener('playing', () => setEstado('playing'));
  audio.addEventListener('pause', () => {
    if (!audio.ended && root.dataset.state !== 'error') setEstado('paused');
  });
  audio.addEventListener('ended', () => {
    setEstado('ended');
    pintar(1);
  });
  audio.addEventListener('seeked', () => {
    // Voltou a barra depois do fim: deixa de ser "fim do episódio".
    if (root.dataset.state === 'ended' && !audio.ended) setEstado(audio.paused ? 'paused' : 'playing');
    atualizar();
  });
  audio.addEventListener('error', () => setEstado('error'));
  audio.addEventListener('timeupdate', atualizar);
  audio.addEventListener('loadedmetadata', () => {
    dur.textContent = formatar(audio.duration);
    audio.playbackRate = velocidade;
    if (posicaoPendente !== null) {
      audio.currentTime = posicaoPendente * audio.duration;
      posicaoPendente = null;
    }
    atualizar();
  });

  // Barra de progresso (arrastar com mouse/dedo ou setas do teclado).
  seek.addEventListener('pointerdown', () => {
    arrastando = true;
  });
  seek.addEventListener('input', () => {
    arrastando = true;
    pintar(Number(seek.value) / 1000);
  });
  seek.addEventListener('change', () => {
    const fracao = Number(seek.value) / 1000;
    const d = duracao();
    if (d) {
      audio.currentTime = fracao * d;
    } else {
      // Com preload="none" a duração só existe depois de carregar os metadados.
      posicaoPendente = fracao;
      audio.preload = 'metadata';
      audio.load();
    }
    arrastando = false;
  });
  seek.addEventListener('blur', () => {
    arrastando = false;
  });

  // Velocidade.
  speed?.addEventListener('change', (e) => {
    const alvo = e.target as HTMLInputElement;
    velocidade = Number(alvo.value) || 1;
    audio.playbackRate = velocidade;
    audio.defaultPlaybackRate = velocidade;
  });

  setEstado('idle');
  pintar(0);
});

export {};
