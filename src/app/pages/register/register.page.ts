import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { RequestRegisterDto } from 'src/app/services/api/auth-api/auth.dto';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegisterPage {

  readonly router = inject(Router);
  readonly deviceService = inject(DeviceService);
  readonly alertService = inject(AlertService);
  readonly auth = inject(AuthService);
  readonly loadingService = inject(LoadingService);

  public fullName = '';
  public email = '';
  public password = '';
  public confirmPassword = '';

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.alertService.presentAlertError('Password confirmation not match');
      return;
    }

    const body: RequestRegisterDto = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.confirmPassword
    }

    this.auth.register(body);
  }

  login() {
    this.router.navigate(['/login'])
  }
}
