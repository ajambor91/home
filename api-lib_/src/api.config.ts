import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig, EnvironmentProviders, InjectionToken, Provider} from '@angular/core';
// import {EnvironmentsService} from "../src/services/environments.service";

export const provideApiConfig = (url: string): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withFetch()),
        { provide: API_URL, useValue: url }

    ];
};
export const API_URL = new InjectionToken<string>('API_URL');
