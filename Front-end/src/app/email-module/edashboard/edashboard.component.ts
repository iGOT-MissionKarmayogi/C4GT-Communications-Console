import { Component } from '@angular/core';
import { EmailMenuComponent } from '../email-menu/email-menu.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-edashboard',
  standalone: true,
  imports: [EmailMenuComponent,RouterModule],
  templateUrl: './edashboard.component.html',
  styleUrl: './edashboard.component.css'
})
export class EdashboardComponent {

}




