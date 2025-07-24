
import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonRouterLink, IonRouterOutlet, IonSplitPane } from '@ionic/angular/standalone';
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
      if (this.auth.isAdmin()) {
        this.appPages = [
          { title: 'Daftar Vote', url: '/vote', icon: 'home' },
          { title: 'Users', url: '/users', icon: 'person-outline' },
          { title: 'Keluar', url: '/', icon: 'log-out-outline' },
        ];
      } else {
        this.appPages = [
          { title: 'Beranda', url: '/home', icon: 'home' },
          { title: 'Keluar', url: '/', icon: 'log-out-outline' },
        ];
      }
    }, { allowSignalWrites: true })
    addIcons({ home, logInOutline });
  }

  openPage(page: any) {
    console.log(page)
    if (page?.title === 'Keluar') {
      console.log('masuk')
      this.auth.logout();
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([page?.url]);
  }
}
