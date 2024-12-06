import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
 
import { provideRouter } from '@angular/router';
 
import { provideHttpClient, HTTP_INTERCEPTORS,withInterceptorsFromDi } from '@angular/common/http';
 
import { routes } from './app.routes';
 
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
 
import { AuthInterceptor } from './auth.interceptor';  // Import the interceptor
import { withFetch } from '@angular/common/http';
 
export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withInterceptorsFromDi()),  // Just provide the HttpClient without interceptors here
      {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
      },
      provideHttpClient(withFetch())
    ]
  };
