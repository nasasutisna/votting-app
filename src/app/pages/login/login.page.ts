import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonButtons, IonMenuButton, IonRouterLink } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonItem, IonMenuButton]
}) 
export class LoginPage implements OnInit {

  public password = '';
  public email = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() { }

  register() {
    this.router.navigate(['/register'])
  }
}
