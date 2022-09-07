import { GlobalErrorEffects } from './global-error.effects';
import { RouterEffects } from 'src/app/store/effects/router.effects';

export const effects: any[] = [GlobalErrorEffects, RouterEffects];

export * from './global-error.effects';
export * from './router.effects';
