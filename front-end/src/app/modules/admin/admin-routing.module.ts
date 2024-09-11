import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MediumSelectorComponent } from './components/medium-selector/medium-selector.component';





import { CreateTemplateComponent } from '../../email-module/create-template/create-template.component';
import { ConfigureTemplateComponent } from '../../email-module/configure-template/configure-template.component';
import { ViewUserDataComponent } from '../../email-module/view-user-data/view-user-data.component';
import { UploadUserDataComponent } from '../../email-module/upload-user-data/upload-user-data.component';
import { SendEmailComponent } from '../../email-module/send-email/send-email.component';
import { HistoryComponent } from '../../email-module/history/history.component';
import { EdashboardComponent } from '../../email-module/edashboard/edashboard.component';
import { CreateWhatsAppTemplateComponent } from '../../whatsapp-module/create-template/create-template.component';
import { ConfigureWhatsAppTemplateComponent } from '../../whatsapp-module/configure-template/configure-template.component';
import { SendWhatsAppComponent } from '../../whatsapp-module/send-whatsapp/send-whatsapp.component';
import { EdashboardWhatsAppComponent } from '../../whatsapp-module/edashboard/edashboard.component';
import { ViewWhatsAppUserDataComponent } from '../../whatsapp-module/view-user-data/view-user-data.component';
import { UploadWhatsappUserDataComponent } from '../../whatsapp-module/upload-user-data/upload-user-data.component';








const routes: Routes = [
  {path: '', component: AdminDashboardComponent, 
    children: [
      {path: 'campaigns', component: CampaignsComponent},
      {path: 'type', component: MediumSelectorComponent},
      {path: '', redirectTo: '/dashboard/campaigns', pathMatch: 'full'},

      //sms routes
      {path: 'sms', loadChildren: () => 
        import('../../sms-module/sms-module.module').then(m => m.SMSModuleModule),
      },

      { path: 'whatsapp/create-template', component: CreateWhatsAppTemplateComponent },
      { path: 'whatsapp/configure-template', component: ConfigureWhatsAppTemplateComponent },
      { path: 'whatsapp/view-user-data', component: ViewWhatsAppUserDataComponent },
      { path: 'whatsapp/upload-user-data', component:UploadWhatsappUserDataComponent },
      { path: 'whatsapp/send-email', component: SendWhatsAppComponent },
      { path: 'whatsapp/edashboard', component: EdashboardWhatsAppComponent },
      
 
      // Whatsapp routes
      {path:'whatsapp/templates',component:ConfigureWhatsAppTemplateComponent},
      {path:'whatsapp/create',component:CreateWhatsAppTemplateComponent},
      {path:'whatsapp/use/:templateId', component:ViewWhatsAppUserDataComponent},
      //Email routes
      { path: 'email/create-template', component: CreateTemplateComponent },
      { path: 'email/configure-template', component: ConfigureTemplateComponent },
      { path: 'email/view-user-data', component: ViewUserDataComponent },
      { path: 'email/upload-user-data', component: UploadUserDataComponent },
      { path: 'email/send-email', component: SendEmailComponent },
      { path: 'email/history', component: HistoryComponent },
      { path: 'email/edashboard', component: EdashboardComponent },
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
