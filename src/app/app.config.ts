import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

// Main app configuration - sets up services that the whole app needs
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // Enables HTTP requests to load JSON data files
  ],
};
