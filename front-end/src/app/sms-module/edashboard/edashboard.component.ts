import { Component } from '@angular/core';
import { smsMenuComponent } from '../sms-menu/sms-menu.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-edashboard',
  standalone: true,
  imports: [smsMenuComponent,RouterModule],
  templateUrl: './edashboard.component.html',
  styleUrl: './edashboard.component.css'
})
export class EdashboardComponent {

}




