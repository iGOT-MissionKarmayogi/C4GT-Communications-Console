import { Component } from '@angular/core';
import { Output, Input, EventEmitter } from '@angular/core';
import { PropServiceService } from '../../services/prop-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medium-select-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medium-select-dialog.component.html',
  styleUrls: ['./medium-select-dialog.component.css']
})
export class MediumSelectDialogComponent {
  @Input() campaign: any;
  @Output() close = new EventEmitter<void>();

  selectedMedium: string | null = null;

  constructor(
    private propService: PropServiceService,
    private router: Router) { }

  mediumSelect(medium: string) {
    this.selectedMedium = medium;
  }

  submit() {
    if (this.selectedMedium) {
      this.propService.setMedium(this.selectedMedium);
      if (this.selectedMedium === 'Whatsapp') {
        this.router.navigate([`/dashboard/whatsapp/templates`]);
      } else if (this.selectedMedium === 'Email') {
        // Update the navigation path for Email
        this.router.navigate([`/dashboard/email/edashboard`]);
      } else {
        this.router.navigate([`/dashboard/sms/edashboard`]);
      }
    } else {
      alert('Please select a method of communication');
    }
  }
  isClosing: boolean = false;
  Open: boolean = true;

  closeDetails() {
    this.isClosing = true;
    setTimeout(() => {
      this.close.emit();
      this.Open = false;
    }, 300); // Duration of the closing animation, adjust as necessary
  }
}
