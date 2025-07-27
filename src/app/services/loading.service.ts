import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: any;
  constructor(private loadingCtrl: LoadingController) { }

  async showLoading(message = 'Harap tunggu sebentar') {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 3000,
    });

    await this.loading.present();
  }

  hideLoading() {
    if (this.loading) this.loading.dismiss()
  }
}
