import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';

const qc = new QueryClient();
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAngularQuery(qc),
  ],
};
