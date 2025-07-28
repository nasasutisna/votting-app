import { CommonModule } from '@angular/common';
import { Component, inject, Input, model, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RequestPollDto, ResponsePollListDto } from 'src/app/services/api/poll-api/poll.dto';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { VoteService } from 'src/app/services/vote.service';
import { PollingAddOptionsPage } from '../polling-add-options/polling-add-options.page';
import { Subject, takeUntil } from 'rxjs';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-polling-vote',
  templateUrl: './polling-vote.page.html',
  styleUrls: ['./polling-vote.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyStateComponent]
})
export class PollingVotePage implements OnInit, OnDestroy {

  @Input() params: any;
  readonly voteService = inject(VoteService);
  readonly alertService = inject(AlertService);
  readonly loadingService = inject(LoadingService);
  readonly authService = inject(AuthService);
  readonly modalService = inject(ModalService);

  selectedOptionId = model<number | null>(null);
  hasVoted = false;
  isEditing = false;
  dataSource!: ResponsePollListDto | null;
  userVoteId: number | null = null;
  destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit() {
    console.log(this.params)
    if (this.params) {
      this.getDetailPoll();
      this.voteService.loadList$.pipe(takeUntil(this.destroy$)).subscribe(() => this.getDetailPoll())
    } else {
      this.getPollingList();
      this.voteService.loadList$.pipe(takeUntil(this.destroy$)).subscribe(() => this.getPollingList())
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async getDetailPoll() {
    try {
      await this.loadingService.showLoading();
      const user = this.authService.getUser();
      const result = await this.voteService.getDetail(this.params?._id);
      this.dataSource = result.data;
      const selectedOptionId = this.dataSource.voted.find(fi => fi.userId === user?._id)?.optionId || 0;
      this.selectedOptionId.set(selectedOptionId);
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  async getPollingList() {
    try {
      await this.loadingService.showLoading();
      const result = await this.voteService.getListPoll({ limit: 1, page: 1, votedActive: true });
      this.dataSource = result.data?.length ? result.data[0] : null;
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  async submitVote() {
    const selectedId = this.selectedOptionId();
    if (!selectedId) return;

    try {
      await this.loadingService.showLoading();
      const body: RequestPollDto = {
        pollId: this.dataSource?._id || '',
        optionId: selectedId
      }
      await this.voteService.vote(body);
      this.alertService.presentAlertSuccess('Successfully Sent Vote');

      if (this.params) {
        this.modalService.dismiss();
      } else {
        this.getPollingList();
      }

    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message)
    } finally {
      this.loadingService.hideLoading();
    }
  }

  editVote() {
    this.isEditing = true;
    // this.selectedOptionId.set(this.userVoteId);
  }

  addOptions() {
    this.modalService.openModal(PollingAddOptionsPage, { id: this.dataSource?._id })
  }
}
