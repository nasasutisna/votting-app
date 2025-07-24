import { Component, inject, input } from '@angular/core';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton],
  standalone: true
})
export class HeaderComponent {
  readonly deviceService = inject(DeviceService)
  title = input('');
}
