import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmailMenuComponent } from './email-menu/email-menu.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { ConfigureTemplateComponent } from './configure-template/configure-template.component';
import { ViewUserDataComponent } from './view-user-data/view-user-data.component';
import { UploadUserDataComponent } from './upload-user-data/upload-user-data.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { HistoryComponent } from './history/history.component';
import { EdashboardComponent } from './edashboard/edashboard.component';

import { EmailModuleRoutingModule } from './email-module-routing.module';


@NgModule({
  imports: [
    CommonModule,
    EmailModuleRoutingModule,
    RouterModule,
    EmailMenuComponent,
    CreateTemplateComponent,
    ConfigureTemplateComponent,
    ViewUserDataComponent,
    UploadUserDataComponent,
    SendEmailComponent,
    HistoryComponent,
    EdashboardComponent
  ],
  declarations: [],
  exports: [EmailMenuComponent],
})
export class EmailModuleModule { }


