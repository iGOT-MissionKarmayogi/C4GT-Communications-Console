import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateNewTemplateComponent } from './components/create-new-template/create-new-template.component';
import { MediumSelectorComponent } from './components/medium-selector/medium-selector.component';
import { UseTemplateComponent } from './components/use-template/use-template.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { WhatsappTemplateSelectorComponent } from '../../WhatsappModule/Components/Template-Selector/template-selector.component';
import { WhatsappTemplateCreatorComponent } from '../../WhatsappModule/Components/Template-Creator/template-creator.component';
import { WhatsappTemplateUserComponent } from '../../WhatsappModule/Components/Template-User/template-user.component';


import { CreateTemplateComponent } from '../../email-module/create-template/create-template.component';
import { ConfigureTemplateComponent } from '../../email-module/configure-template/configure-template.component';
import { ViewUserDataComponent } from '../../email-module/view-user-data/view-user-data.component';
import { UploadUserDataComponent } from '../../email-module/upload-user-data/upload-user-data.component';
import { SendEmailComponent } from '../../email-module/send-email/send-email.component';
import { HistoryComponent } from '../../email-module/history/history.component';
import { EdashboardComponent } from '../../email-module/edashboard/edashboard.component';








const routes: Routes = [
  {path: '', component: AdminDashboardComponent, 
    children: [
      {path: 'campaigns', component: CampaignsComponent},
      {path: 'type', component: MediumSelectorComponent},
      {path: 'templates/:type', component:TemplateSelectorComponent},
      {path: 'templates/:type/create', component: CreateNewTemplateComponent},
      {path: ':type/:templateId/users', component: UseTemplateComponent},
      {path: 'campaigns/users',component:UserDataComponent},
      {path: '', redirectTo: '/dashboard/campaigns', pathMatch: 'full'},

      //sms routes
      {path: 'sms', loadChildren: () => 
        import('../../sms-module/sms-module.module').then(m => m.SMSModuleModule),
      },


      // Whatsapp routes
      {path:'whatsapp/templates',component:WhatsappTemplateSelectorComponent},
      {path:'whatsapp/create',component:WhatsappTemplateCreatorComponent},
      {path:'whatsapp/use/:templateId', component:WhatsappTemplateUserComponent},
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
