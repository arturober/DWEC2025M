import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideGoogleId } from './google-login/google-login.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideGoogleId('940474514077-20namm6ra4h93elaaun08nvarq07i3hh.apps.googleusercontent.com'),
  ]
};
