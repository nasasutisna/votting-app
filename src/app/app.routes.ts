import { Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginGuardService } from './guards/login-guard.service';
import { HomeGuardService } from './guards/home-guard.service';
import { VoteGuardService } from './guards/vote-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    canActivate: [AuthGuardService],
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    canActivate: [HomeGuardService],
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'users',
    canActivate: [VoteGuardService],
    loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage)
  },
  {
    path: 'vote',
    canActivate: [VoteGuardService],
    loadComponent: () => import('./pages/vote/vote.page').then(m => m.VotePage)
  },
];
