import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage implements OnInit {
  readonly router = inject(Router);
  readonly deviceService = inject(DeviceService);
  readonly auth = inject(AuthService);

  public password = '';
  public email = '';

  ngOnInit() {
  }

  onLogin() {
    this.auth.login(this.email, this.password);
    this.router.navigate(['/home'])
  }

  register() {
    this.router.navigate(['/register'])
  }
}
