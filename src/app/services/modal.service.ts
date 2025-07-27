import { Injectable } from '@angular/core';
import { IonButton, IonChip, IonContent, IonIcon, ModalController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal!: HTMLIonModalElement;
  constructor(private modalController: ModalController) { }

  async openModal(component: any, componentProps?: any) {
    this.modal = await this.modalController.create({
      component,
      componentProps
    });
    await this.modal.present();

    const { data, role } = await this.modal.onDidDismiss();
    return { data, role };
  }

  dismiss() {
    if (this.modal) this.modal.dismiss();
  }
}
