import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RequestAddPollDto } from 'src/app/services/api/poll-api/poll.dto';
import { AlertService } from 'src/app/services/alert.service';
import { VoteService } from 'src/app/services/vote.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-polling-create',
  templateUrl: './polling-create.page.html',
  styleUrls: ['./polling-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PollingCreatePage implements OnInit {

  readonly alertService = inject(AlertService);
  readonly voteService = inject(VoteService);
  readonly loadingService = inject(LoadingService);
  readonly router = inject(Router);
  readonly modalService = inject(ModalService);

  public options: Array<{ name: string }> = [];
  public formData: RequestAddPollDto = {
    name: '',
    deadlineVote: '',
    question: '',
    options: [{ name: '' }]
  }
  constructor() { }

  ngOnInit() {
  }

  addOption() {
    this.formData.options.push({ name: '' })
  }

  removeOption(index: number) {
    this.formData.options.splice(index, 1)
  }

  async save() {
    try {
      await this.loadingService.showLoading();
      const body = this.formData;
      body.deadlineVote = dayjs(this.formData.deadlineVote).toISOString();
      await this.voteService.addPoll(body);
      this.voteService.loadList$.next();
      this.alertService.presentAlertSuccess('Successfully Saved');
      this.modalService.dismiss();
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message)
    } finally {
      this.loadingService.hideLoading();
    }
  }
}
