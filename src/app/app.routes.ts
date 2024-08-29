import { Routes } from '@angular/router';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { ResponsePageComponent } from './response-page/response-page.component';

export const routes: Routes = [
  { path: '', component: UserFilterComponent },
  { path: 'users', component: ResponsePageComponent },
];
