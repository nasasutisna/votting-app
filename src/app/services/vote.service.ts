import { inject, Injectable } from '@angular/core';
import { firstValueFrom, of, Subject, throwError } from 'rxjs';
import { PollApiService } from './api/poll-api/poll-api.service';
import { RequestPagingDto } from './api/base-api.dto';
import { RequestAddOptionDto, RequestAddPollDto, RequestPollDto } from './api/poll-api/poll.dto';

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
  readonly pollApiService = inject(PollApiService);

  public loadList$ = new Subject<void>();

  private voteData: Vote = {
    id: 'vote1',
    question: 'Siapa kandidat terbaik?',
    options: ['A', 'B', 'C'],
    isClosed: false,
  };

  private userVotes = new Map<string, string>(); // userId -> selectedOption

  getListPoll(queryParams: RequestPagingDto) {
    return firstValueFrom(this.pollApiService.pollList(queryParams));
  }

  addPoll(body: RequestAddPollDto) {
    return firstValueFrom(this.pollApiService.addPoll(body));
  }

  addOption(id: any, body: RequestAddOptionDto) {
    return firstValueFrom(this.pollApiService.addOption(id, body));
  }

  getVote() {
    return of(this.voteData);
  }

  getUserVote(userId: string) {
    return of(this.userVotes.get(userId));
  }

  vote(body: RequestPollDto) {
    return firstValueFrom(this.pollApiService.vote(body));
  }

  getResult(id: string) {
    return firstValueFrom(this.pollApiService.getResult(id));
  }

  getDetail(id: string) {
    return firstValueFrom(this.pollApiService.getDetail(id));
  }

  deletePoll(id: string) {
    return firstValueFrom(this.pollApiService.deletePoll(id));
  }
}
