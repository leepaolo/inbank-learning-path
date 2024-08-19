import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('apiBaseUrl');

export const environment = {
  production: false, // Può essere `true` se sei in produzione
  apiBaseUrl: 'https://localhost:4200',
};
