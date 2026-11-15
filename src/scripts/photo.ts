// A foto do hero só "liga" (flicker, varredura, cantos, medidor, terminal) quando entra na tela.
// Enquanto não entra, o CSS mantém os elementos escondidos (.is-wait sem .is-live).
// Ao passar o mouse, a sequência inteira de entrada roda de novo.
// Sem JavaScript, ou com movimento reduzido, a classe nunca é aplicada e nada muda.
import { onVisible } from './visible';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const photo = document.querySelector<HTMLElement>('.photo');

if (photo && !reduce) {
  photo.classList.add('is-wait');
  onVisible(photo, () => photo.classList.add('is-live'));

  const ENTRANCE = '.a-flicker, .a-sweep, .a-draw, .a-lock, .a-lit, .a-wipe';
  photo.addEventListener('mouseenter', () => {
    if (!photo.classList.contains('is-live')) return;
    photo.querySelectorAll<HTMLElement>(ENTRANCE).forEach((el) => {
      // Zerar a animação e forçar um reflow faz o CSS reiniciar cada uma, com o seu atraso.
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  });
}

export {};
