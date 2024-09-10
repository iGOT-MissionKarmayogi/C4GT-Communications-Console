import { Component } from '@angular/core';
import { WhatsAppMenuComponent } from '../menu/whatsapp-menu.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-edashboard',
  standalone: true,
  imports: [WhatsAppMenuComponent,RouterModule],
  templateUrl: './edashboard.component.html',
  styleUrl: './edashboard.component.css'
})
export class EdashboardWhatsAppComponent {

}




