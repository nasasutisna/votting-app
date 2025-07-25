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
    canActivate: [adminGuard],
    children: [{
      path: '',
      redirectTo: 'vote',
      pathMatch: 'full',
    }, {
      path: 'users',
      loadComponent: () => import('./pages/users/users.page').then(m => m.UsersPage)
    },
    {
      path: 'vote',
      loadComponent: () => import('./pages/vote/vote.page').then(m => m.VotePage)
    }]
  },
];
