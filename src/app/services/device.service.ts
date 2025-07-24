import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private platform: Platform) { }

  get isDesktop() {
    return this.platform.is('desktop');
  }

  get isMobile() {
    return this.platform.is('mobile') || this.platform.is('mobileweb');
  }
}
