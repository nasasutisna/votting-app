import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RequestPagingDto } from 'src/app/services/api/base-api.dto';
import { ResponseGetUsersDto } from 'src/app/services/api/user-api/user.dto';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { UsersCreatePage } from './users-create/users-create.page';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CdkTableModule, EmptyStateComponent]
})
export class UsersPage implements OnInit, OnDestroy {
  readonly usersService = inject(UsersService);
  readonly alertService = inject(AlertService);
  readonly loadingService = inject(LoadingService);
  readonly modalService = inject(ModalService);

  displayedColumns = ['index', 'name', 'email', 'role', 'actions'];
  dataSource: ResponseGetUsersDto[] = [];
  searchTerm = '';
  queryParams: RequestPagingDto = { page: 1, limit: 10 };
  destroy$ = new Subject<void>();
  totalPage = 1;
  currentPage = 0;

  ngOnInit() {
    this.getUsers();

    // listener load list
    this.usersService.loadList$.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getUsers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.queryParams.page++;
      this.getUsers();
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.queryParams.page--;
      this.getUsers();
      this.currentPage--;
    }
  }

  async getUsers() {
    try {
      await this.loadingService.showLoading();
      const result = await this.usersService.getUsers(this.queryParams);
      this.dataSource = result.data;
      this.totalPage = result.totalPage;
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message)
    } finally {
      this.loadingService.hideLoading();
    }
  }

  handleSearch(value: string) {
    this.queryParams.search = value;
    this.queryParams.page = 1;
    this.getUsers();
  }

  onAdd() {
    this.modalService.openModal(UsersCreatePage)
  }

  onEdit(row: ResponseGetUsersDto) {
    console.log('Edit', row);
    this.modalService.openModal(UsersCreatePage, { user: row })
  }

  async onDelete(row: ResponseGetUsersDto) {
    const confirm = await this.alertService.presentAlertConfirm('Confirm', 'Are you sure delete this data?');

    if (confirm) {
      try {
        await this.loadingService.showLoading('Deleting...')
        await this.usersService.deleteUser(row._id);
        this.getUsers();
        this.alertService.presentAlertSuccess('Successfully deleted');
      } catch (error: any) {
        this.alertService.presentAlertError(error?.error?.message);
      } finally {
        this.loadingService.hideLoading();
      }
    }
  }

  trackById(_: number, item: ResponseGetUsersDto) {
    return item._id;
  }
}
