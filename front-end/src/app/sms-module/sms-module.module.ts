import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { smsMenuComponent } from './sms-menu/sms-menu.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { ConfigureTemplateComponent } from './configure-template/configure-template.component';
import { UploadUserDataComponent } from './upload-user-data/upload-user-data.component';
import { HistoryComponent } from './history/history.component';
import { EdashboardComponent } from './edashboard/edashboard.component';

import { SMSModuleRoutingModule } from './sms-module-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SMSModuleRoutingModule,
    RouterModule,
    smsMenuComponent,
    CreateTemplateComponent,
    ConfigureTemplateComponent,
    UploadUserDataComponent,
    HistoryComponent,
    EdashboardComponent
  ],
  declarations: [],
  exports: [smsMenuComponent],
})
export class SMSModuleModule { }


