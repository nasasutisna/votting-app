import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { AuthApiService } from './api/auth-api/auth-api.service';
import { RequestLoginDto, RequestRegisterDto } from './api/auth-api/auth.dto';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { AlertService } from './alert.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  fullName: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly loadingService = inject(LoadingService);
  readonly alertService = inject(AlertService);

  private currentUser = signal<any | null>(null);
  public isAdmin = signal<boolean | null>(null);

  readonly authApi = inject(AuthApiService);
  readonly router = inject(Router);

  async login(email: string, password: string) {
    try {
      await this.loadingService.showLoading();
      const encryptPassword = CryptoJS.AES.encrypt(password, environment.SECRET_CRYPTO).toString();
      console.log('encryptPassword', encryptPassword)
      const body: RequestLoginDto = { email, password: encryptPassword };
      const result = await firstValueFrom(this.authApi.login(body));
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('token', JSON.stringify(result.token));
      localStorage.setItem('isAdmin', JSON.stringify(result.data.role === 'admin'));
      this.currentUser.set(result.data);
      this.router.navigate(['/home'])
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  async register(body: RequestRegisterDto) {
    try {
      await this.loadingService.showLoading();
      await firstValueFrom(this.authApi.register(body));
      this.alertService.presentAlertSuccess('Register Successfully');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.alertService.presentAlertError(error?.error?.message);
    } finally {
      this.loadingService.hideLoading();
    }
  }

  logout() {
    try {
      firstValueFrom(this.authApi.logout())
    } catch (_) { }

    this.currentUser.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.getIsAdmin();
    this.isAuthenticated();
  }

  getUser() {
    return this.currentUser();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token;
  }

  getIsAdmin() {
    const admin = localStorage.getItem('isAdmin');
    const isAdmin = admin ? JSON.parse(admin) === true : false;
    this.isAdmin.set(isAdmin);
    return isAdmin;
  }
}
