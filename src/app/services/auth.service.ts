import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

export interface User {
  id: string;
  fullName: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  public isAdmin = signal<boolean | null>(null);

  login(email: string, password: string) {
    // Simulasi login
    console.log('password', password);
    const user = { id: '1', fullName: 'John Doe', email };
    const isAdmin = email === 'admin';
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(user));
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    return of(user);
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
