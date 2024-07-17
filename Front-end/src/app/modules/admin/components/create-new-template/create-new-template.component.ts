import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { HighlightPipe } from '../../../../pipes/highlighter.pipe';
import { PropServiceService } from '../../../../services/prop-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-template',
  standalone: true,
  imports: [NavbarComponent,CommonModule,HighlightPipe,FormsModule],
  templateUrl: './create-new-template.component.html',
  styleUrl: './create-new-template.component.css'
})
export class CreateNewTemplateComponent {
  selectedCategory: string = '';
  selectedMedium: string|null = null;


  constructor(private propService: PropServiceService) { }

  ngOnInit(): void {
    // Retrieve the medium value when the component initializes
    this.selectedMedium = this.propService.getMedium();
  }
}
