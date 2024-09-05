import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfigureTemplateComponent } from "../configure-template/configure-template.component";
import { CreateTemplateComponent } from "../create-template/create-template.component";
import { UploadUserDataComponent } from "../upload-user-data/upload-user-data.component";
import { HistoryComponent } from "../history/history.component";

@Component({
  selector: 'app-email-menu',
  standalone: true,
  imports: [RouterModule,CommonModule, ConfigureTemplateComponent, CreateTemplateComponent, UploadUserDataComponent, HistoryComponent],
  templateUrl: './sms-menu.component.html',
  styleUrl: './sms-menu.component.css'
})
export class smsMenuComponent {
  selectedMenu: string = 'default';

  selectMenu(option: string) {
  this.selectedMenu = option;
  
  
  }
}
