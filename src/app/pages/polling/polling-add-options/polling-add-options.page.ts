import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { VoteService } from 'src/app/services/vote.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { RequestAddOptionDto } from 'src/app/services/api/poll-api/poll.dto';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-polling-add-options',
  templateUrl: './polling-add-options.page.html',
  styleUrls: ['./polling-add-options.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PollingAddOptionsPage implements OnInit {
  @Input() id: any;
  readonly voteService = inject(VoteService);
  readonly loadingService = inject(LoadingService);
  readonly modalService = inject(ModalService);
  readonly alertSerice = inject(AlertService);

  public formData: RequestAddOptionDto = { name: '' }

  ngOnInit() {
    console.log('navParams', this.id)
  }

  async save() {
    try {
      await this.loadingService.showLoading();
      await this.voteService.addOption(this.id, this.formData);
      await this.loadingService.hideLoading();

      await this.alertSerice.presentAlertSuccess('Successfully Add Options');
      this.voteService.loadList$.next();
      this.modalService.dismiss();
    } catch (error: any) {
      this.alertSerice.presentAlertError(error?.error?.message)
    } finally {
      this.loadingService.hideLoading();
    }
  }

}
