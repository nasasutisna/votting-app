import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  presentAlertError(message: string) {
    return this.presentAlert('Failed', '', message);
  }

  presentAlertSuccess(message: string) {
    return this.presentAlert('Successfully', '', message);
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['Oke'],
    });

    return alert.present();
  }
}
