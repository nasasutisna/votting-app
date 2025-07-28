import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { checkmarkCircle, lockClosedOutline, logInOutline, logOutOutline, mailOutline, personOutline, pieChartOutline, closeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

addIcons({
  'checkmark-circle': checkmarkCircle,
  'mail-outline': mailOutline,
  'lock-closed-outline': lockClosedOutline,
  'person-outline': personOutline,
  'log-in-outline': logInOutline,
  'log-out-outline': logOutOutline,
  'pie-chart-outline': pieChartOutline,
  'close-circle-outline': closeCircleOutline,
});
