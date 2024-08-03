import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigureWhatsAppTemplateComponent } from '../configure-template/configure-template.component';
import { WhatsappTemplateCreatorComponent } from '../../WhatsappModule/Components/Template-Creator/template-creator.component';
import { CreateWhatsAppTemplateComponent } from '../create-template/create-template.component';
import { EdashboardWhatsAppComponent } from '../edashboard/edashboard.component';
import { HistoryComponent } from "../../email-module/history/history.component";
import { UploadWhatsappUserDataComponent } from '../upload-user-data/upload-user-data.component';
import { ViewWhatsAppUserDataComponent } from '../view-user-data/view-user-data.component';
import { SendWhatsAppComponent } from "../send-whatsapp/send-whatsapp.component";

@Component({
  selector: 'app-email-menu',
  standalone: true,
  imports: [CommonModule, ConfigureWhatsAppTemplateComponent, CreateWhatsAppTemplateComponent, EdashboardWhatsAppComponent, UploadWhatsappUserDataComponent, ViewWhatsAppUserDataComponent, SendWhatsAppComponent],
  templateUrl: './sms-menu.component.html',
  styleUrl: './sms-menu.component.css'
})
export class smsMenuComponent {
  selectedMenu: string = 'default';

  selectMenu(option: string) {
  this.selectedMenu = option;
  }
}
