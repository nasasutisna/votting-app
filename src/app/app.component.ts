
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterLink, IonRouterOutlet, IonSplitPane, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, logInOutline } from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly router = inject(Router);

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'login', url: '/login', icon: 'logInOutline' }
  ];

  constructor() {
    effect(() => {
      this.auth.getUser();
      this.auth.getIsAdmin();
      if (this.auth.isAdmin()) {
        this.appPages = [
          { title: 'Polling', url: '/admin/polling', icon: 'home' },
          { title: 'Users', url: '/admin/users', icon: 'person-outline' },
          { title: 'Log Out', url: 'logout', icon: 'log-out-outline' },
        ];
      } else {
        this.appPages = [
          { title: 'Home', url: '/home', icon: 'home' },
          { title: 'Polling', url: '/admin/polling', icon: 'pie-chart-outline' },
          { title: 'Log Out', url: 'logout', icon: 'log-out-outline' },
        ];
      }
    }, { allowSignalWrites: true })
    addIcons({ home, logInOutline });
  }

  openPage(page: any) {
    if (page?.url === 'logout') {
      this.auth.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([page?.url]);
  }
}
