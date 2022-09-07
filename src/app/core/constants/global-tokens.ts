import { InjectionToken } from '@angular/core';

import { Environment } from 'src/environments/environment';

export const ENVIRONMENT = new InjectionToken<Environment>('Environment object');
export const PUBLIC_FALLBACK_URL = new InjectionToken<string>('Public Fallback Url');
export const PRIVATE_FALLBACK_URL = new InjectionToken<string>('Private Fallback Url');
