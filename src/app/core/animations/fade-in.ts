import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = [
  trigger('fadeIn', [
    state(
      '*',
      style({
        opacity: '0',
      }),
    ),
    state(
      'show',
      style({
        opacity: '1',
      }),
    ),
    transition('* => show', [animate('0.6s')]),
    transition('maxSize => *', [animate('0.6s')]),
  ]),
];
