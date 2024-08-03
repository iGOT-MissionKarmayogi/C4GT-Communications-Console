import { Component, input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-use-template',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './use-template.component.html',
  styleUrl: './use-template.component.css'
})
export class UseTemplateComponent {


}
