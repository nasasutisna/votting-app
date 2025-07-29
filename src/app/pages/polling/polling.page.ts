import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RequestPagingDto } from 'src/app/services/api/base-api.dto';
import { ResponsePollListDto } from 'src/app/services/api/poll-api/poll.dto';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { VoteService } from 'src/app/services/vote.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PollingCreatePage } from './polling-create/polling-create.page';
import { Subject, takeUntil } from 'rxjs';
import { PollingVotePage } from './polling-vote/polling-vote.page';
import dayjs from 'dayjs';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { PollingViewResultPage } from './polling-view-result/polling-view-result.page';
import { PollingAddOptionsPage } from './polling-add-options/polling-add-options.page';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.page.html',
  styleUrls: ['./polling.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CdkTableModule, HeaderComponent, EmptyStateComponent]
})
export class PollingPage implements OnInit, OnDestroy {
  readonly voteService = inject(VoteService);
  readonly alertService = inject(AlertService);
  readonly loadingService = inject(LoadingService);
  readonly authService = inject(AuthService);
  readonly modalService = inject(ModalService);

  public displayedColumns = ['index', 'name', 'question', 'deadlineVote', 'actions'];
  public dataSource: ResponsePollListDto[] = [];
  public queryParams: RequestPagingDto = { page: 1, limit: 10, search: '' }
  public searchTerm = '';

  public destroy$ = new Subject<void>();

  totalPage = 1;
  currentPage = 0;

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
      this.queryParams.page++;
      this.getPollingList();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.queryParams.page--;
      this.getPollingList();
    }
  }

  ngOnInit() {
    this.getPollingList();
    this.voteService.loadList$.pipe(takeUntil(this.destroy$)).subscribe(() => this.getPollingList());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async getPollingList() {
    try {
      await this.loadingService.showLoading();
      const result = await this.voteService.getListPoll(this.queryParams);
      this.totalPage = result.totalPage;
      this.dataSource = result.data.map(item => {
        item.deadlineVote = dayjs(item.deadlineVote).format('DD, MMMM YYYY HH:mm')
        return item;
      });
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  handleSearch(value: string) {
    this.queryParams.search = value;
    this.queryParams.page = 1;
    this.getPollingList();
  }

  onEdit(row: ResponsePollListDto) {
    console.log('Edit', row);
    // Arahkan ke halaman edit atau buka modal
  }

  async onDelete(row: ResponsePollListDto) {
    const confirm = await this.alertService.presentAlertConfirm('Confirm', 'Are you sure delete this data?');
    // Konfirmasi dan hapus data
    if (confirm) {
      try {
        await this.loadingService.showLoading('Deleting...')
        await this.voteService.deletePoll(row._id);
        this.voteService.loadList$.next();
        this.alertService.presentAlertSuccess('Successfully deleted');
      } catch (error: any) {
        this.alertService.presentAlertError(error?.error?.message);
      } finally {
        this.loadingService.hideLoading();
      }
    }
  }

  onAdd() {
    this.modalService.openModal(PollingCreatePage);
  }

  trackById(index: number, item: ResponsePollListDto) {
    return item._id;
  }

  onVote(row: ResponsePollListDto) {
    this.modalService.openModal(PollingVotePage, { params: row })
  }

  onViewResult(id: string) {
    this.modalService.openModal(PollingViewResultPage, { id })
  }

  onAddOptions(id: string) {
    this.modalService.openModal(PollingAddOptionsPage, { id })
  }
}
