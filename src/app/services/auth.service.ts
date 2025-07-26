import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { AuthApiService } from './api/auth-api/auth-api.service';
import { RequestLoginDto } from './api/auth-api/auth.dto';
import { Router } from '@angular/router';

export interface User {
  id: string;
  fullName: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<any | null>(null);
  public isAdmin = signal<boolean | null>(null);

  readonly authApi = inject(AuthApiService);
  readonly router = inject(Router);

  async login(email: string, password: string) {
    try {
      const body: RequestLoginDto = { email, password };
      const result = await firstValueFrom(this.authApi.login(body));
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('token', JSON.stringify(result.token));
      localStorage.setItem('isAdmin', JSON.stringify(result.data.role === 'admin'));
      this.currentUser.set(result.data);
      this.router.navigate(['/home'])
    } catch (error) {
      console.log(error);
    }
  }

  register(data: { fullName: string; email: string; password: string }) {
    // Simulasi register langsung login
    return this.login(data.email, data.password);
  }

  logout() {
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
    console.log('isadmin', admin)
    const isAdmin = admin ? JSON.parse(admin) === true : false;
    this.isAdmin.set(isAdmin);
    return isAdmin;
  }
}
