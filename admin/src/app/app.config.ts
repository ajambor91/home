import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideApiConfig} from 'api-lib/src/api.config';
import { routes } from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideHttpClient(withFetch()),  provideApiConfig(environment.apiUrl)],

};
