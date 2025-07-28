import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RequestCreateUserDto, ResponseGetUsersDto } from 'src/app/services/api/user-api/user.dto';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.page.html',
  styleUrls: ['./users-create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsersCreatePage implements OnInit {
  @Input() user!: ResponseGetUsersDto;

  readonly usersService = inject(UsersService);
  readonly alertService = inject(AlertService);
  readonly loadingService = inject(LoadingService);
  readonly modalService = inject(ModalService);

  formData: RequestCreateUserDto = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  ngOnInit(): void {
    if (this.user) {
      this.formData.fullName = this.user.fullName;
      this.formData.email = this.user.email;
    }
    console.log('user', this.user)
  }

  async save() {
    try {
      if (this.formData.password !== this.formData.passwordConfirmation) {
        this.alertService.presentAlertError('Password confirmation not match');
        return;
      }

      await this.loadingService.showLoading();

      if (this.user?._id) {
        await this.usersService.updateUser(this.user?._id, this.formData);
      } else {
        await this.usersService.addUser(this.formData);
      }

      await this.loadingService.hideLoading();

      this.usersService.loadList$.next();
      this.alertService.presentAlertSuccess('Successfully Saved');
      this.modalService.dismiss();
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }



}
