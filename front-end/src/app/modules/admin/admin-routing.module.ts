import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'campaigns', component: CampaignsComponent },
      { path: '', redirectTo: '/dashboard/campaigns', pathMatch: 'full' },

      //sms routes
      //sms routes
      {
        path: 'sms',
        loadChildren: () =>
          import('../../sms-module/sms-module.module').then(
            (m) => m.SMSModuleModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
