import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

export interface Vote {
  id: string;
  question: string;
  options: string[];
  isClosed: boolean;
}

export interface UserVote {
  userId: string;
  voteId: string;
  selectedOption: string;
}


@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private voteData: Vote = {
    id: 'vote1',
    question: 'Siapa kandidat terbaik?',
    options: ['A', 'B', 'C'],
    isClosed: false,
  };

  private userVotes = new Map<string, string>(); // userId -> selectedOption

  getVote() {
    return of(this.voteData);
  }

  getUserVote(userId: string) {
    return of(this.userVotes.get(userId));
  }

  submitVote(userId: string, option: string) {
    if (!this.voteData.isClosed) {
      this.userVotes.set(userId, option);
      return of(true);
    }
    return throwError(() => new Error('Voting closed'));
  }
}
