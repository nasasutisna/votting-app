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

  login(email: string, password: string) {
    // Simulasi login
    console.log('password', password);
    const user = { id: '1', fullName: 'John Doe', email };
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    return of(user);
  }

  register(data: { fullName: string; email: string; password: string }) {
    // Simulasi register langsung login
    return this.login(data.email, data.password);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  getUser() {
    return this.currentUser();
  }

  isAuthenticated() {
    return !!this.currentUser();
  }
}
