import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  readonly router = inject(Router);
  readonly deviceService = inject(DeviceService);
  readonly alertService = inject(AlertService);
  readonly auth = inject(AuthService);
  readonly loadingService = inject(LoadingService);

  public password = '';
  public email = '';

  onLogin() {
    this.auth.login(this.email, this.password);
  }

  register() {
    this.router.navigate(['/register'])
  }
}
