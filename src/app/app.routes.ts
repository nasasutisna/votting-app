import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { AuthGuardService } from './guards/auth-guard.service';
import { HomeGuardService } from './guards/home-guard.service';

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
    path: 'admin',
    // canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'polling',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage)
      },
      {
        path: 'polling-create',
        loadComponent: () => import('./pages/polling/polling-create/polling-create.page').then(m => m.PollingCreatePage)
      },
      {
        path: 'polling-view-result',
        loadComponent: () => import('./pages/polling/polling-view-result/polling-view-result.page').then(m => m.PollingViewResultPage)
      },
      {
        path: 'polling',
        loadComponent: () => import('./pages/polling/polling.page').then(m => m.PollingPage)
      }]
  },
  {
    path: 'polling-vote',
    loadComponent: () => import('./pages/polling/polling-vote/polling-vote.page').then(m => m.PollingVotePage)
  },
  {
    path: 'polling-add-options',
    loadComponent: () => import('./pages/polling/polling-add-options/polling-add-options.page').then(m => m.PollingAddOptionsPage)
  },
  {
    path: 'users-create',
    loadComponent: () => import('./pages/users/users-create/users-create.page').then( m => m.UsersCreatePage)
  }
];
