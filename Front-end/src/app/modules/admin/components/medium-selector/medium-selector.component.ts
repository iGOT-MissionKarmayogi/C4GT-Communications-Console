import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { PropServiceService } from '../../../../services/prop-service.service';

@Component({
  selector: 'app-medium-selector',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './medium-selector.component.html',
  styleUrls: ['./medium-selector.component.css'],
})
export class MediumSelectorComponent {
  selectedMedium: string | null = null;

  constructor(
    private router: Router,
    private propService: PropServiceService
  ) {}

  selectMedium(response: string) {
    this.selectedMedium = response.toLowerCase();
  }

  submitHandler() {
    if (this.selectedMedium) {
      this.propService.setMedium(this.selectedMedium);
      this.router.navigate([`/dashboard/templates/${this.selectedMedium}`]);
    }
  }
}
