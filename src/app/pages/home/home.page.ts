import { CommonModule } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class HomePage {
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

  selectedOptionId = model<number | null>(null);
  hasVoted = false;
  isEditing = false;
  userVoteId: number | null = null;

  submitVote() {
    const selectedId = this.selectedOptionId();
    if (!selectedId) return;

    // Kalau edit, hapus vote sebelumnya
    if (this.hasVoted && this.userVoteId !== null) {
      const oldOption = this.voteData.options.find(o => o.id === this.userVoteId);
      if (oldOption) {
        oldOption.votes -= 1;
        this.voteData.totalVotes -= 1;
      }
    }

    const selected = this.voteData.options.find(opt => opt.id === selectedId);
    if (selected) {
      selected.votes += 1;
      this.voteData.totalVotes += 1;
    }

    this.userVoteId = selectedId;
    this.hasVoted = true;
    this.isEditing = false;
  }

  editVote() {
    this.isEditing = true;
    this.selectedOptionId.set(this.userVoteId);
  }
}