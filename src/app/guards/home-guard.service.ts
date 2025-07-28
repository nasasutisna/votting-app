import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.auth.getIsAdmin()) {
      this.router.navigate(['/admin/polling']);
      return false;
    }

    return true;
  }
}
