// A foto do hero só "liga" (flicker, varredura, cantos, medidor, terminal) quando entra na tela.
// Enquanto não entra, o CSS mantém os elementos escondidos (.is-wait sem .is-live).
// Sem JavaScript, ou com movimento reduzido, a classe nunca é aplicada e nada muda.
import { onVisible } from './visible';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const photo = document.querySelector<HTMLElement>('.photo');

if (photo && !reduce) {
  photo.classList.add('is-wait');
  onVisible(photo, () => photo.classList.add('is-live'));
}

export {};
