import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminModule } from './modules/admin/admin.module';
import { authGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login',component: HomeComponent},
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
];
