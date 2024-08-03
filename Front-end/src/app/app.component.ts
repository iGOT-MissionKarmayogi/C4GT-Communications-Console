import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './modules/admin/components/navbar/navbar.component';
import { CampaignsComponent } from './modules/admin/components/campaigns/campaigns.component';
import { TemplateSelectorComponent } from './modules/admin/components/template-selector/template-selector.component';
import { ReactiveFormsModule,NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,NavbarComponent,CampaignsComponent,TemplateSelectorComponent,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Notification-Module';
}
