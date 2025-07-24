import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegisterPage {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private auth: AuthService, private router: Router) { }

  onRegister() {
    if (this.password !== this.confirmPassword) return;
    this.auth.register({ fullName: this.fullName, email: this.email, password: this.password })
      .subscribe(() => this.router.navigate(['/home']));
  }


  login() {
    this.router.navigate(['/login'])
  }
}
