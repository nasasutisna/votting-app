import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { VoteService } from 'src/app/services/vote.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ResponseGetResultDto } from 'src/app/services/api/poll-api/poll.dto';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-polling-view-result',
  templateUrl: './polling-view-result.page.html',
  styleUrls: ['./polling-view-result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyStateComponent]
})
export class PollingViewResultPage implements OnInit {
  @Input() id!: string;

  readonly voteService = inject(VoteService);
  readonly alertService = inject(AlertService);
  readonly loadingService = inject(LoadingService);

  voteData = {
    title: 'Siapa kandidat terbaik untuk ketua OSIS 2025?',
    description: 'Pilih satu dari kandidat berikut yang menurutmu paling cocok.',
    options: [
      { id: 1, text: 'Andi Saputra', votes: 45, respondents: ['Rina', 'Agus', 'Dewi'] },
      { id: 2, text: 'Budi Hartono', votes: 32, respondents: ['Sari', 'Nando'] },
      { id: 3, text: 'Citra Lestari', votes: 23, respondents: ['Lala', 'Yudi'] }
    ],
    totalVotes: 100
  };

  hasVoted = false;
  isEditing = false;
  showRespondents: any;
  userVoteId: number | null = null;
  maxVote: number = 0;

  dataSource!: ResponseGetResultDto;
  constructor() { }

  ngOnInit() {
    // Inisialisasi toggle untuk setiap opsi polling
    this.showRespondents = this.voteData.options.map(() => false);
    this.getViewResult();
  }

  toggleRespondent(index: number) {
    this.showRespondents[index] = !this.showRespondents[index];
  }

  async getViewResult() {
    try {
      await this.loadingService.showLoading();
      const result = await this.voteService.getResult(this.id);
      this.maxVote = Math.max(...result.data.options.map(o => o.totalVoted));

      console.log('maxVote', this.maxVote)
      console.log(result)
      this.dataSource = result.data;
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message)
    } finally {
      this.loadingService.hideLoading();
    }
  }
}
