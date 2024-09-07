import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigureWhatsAppTemplateComponent } from '../configure-template/configure-template.component';
import { CreateWhatsAppTemplateComponent } from '../create-template/create-template.component';
import { EdashboardWhatsAppComponent } from '../edashboard/edashboard.component';
import { HistoryComponent } from "../../email-module/history/history.component";
import { UploadWhatsappUserDataComponent } from '../upload-user-data/upload-user-data.component';
import { ViewWhatsAppUserDataComponent } from '../view-user-data/view-user-data.component';
import { SendWhatsAppComponent } from "../send-whatsapp/send-whatsapp.component";
import { SelectTemplateComponent } from "../select-template/select-template.component";

@Component({
  selector: 'app-whatsapp-menu',
  standalone: true,
  imports: [CommonModule, ConfigureWhatsAppTemplateComponent, CreateWhatsAppTemplateComponent, EdashboardWhatsAppComponent, UploadWhatsappUserDataComponent, ViewWhatsAppUserDataComponent, SendWhatsAppComponent, SelectTemplateComponent],
  templateUrl: './whatsapp-menu.component.html',
  styleUrl: './whatsapp-menu.component.css'
})
export class WhatsAppMenuComponent {
  selectedMenu: string = 'select-template';

  selectMenu(option: string) {  
  this.selectedMenu = option;
  }
}
