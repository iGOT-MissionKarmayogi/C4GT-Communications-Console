import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Input,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-variable-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './variable-popup.component.html',
  styleUrl: './variable-popup.component.css'
})
export class VariablePopupComponent {
  @Input() variables: any[] = [];
  @Output() updateTemplate = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.updateTemplate.emit(this.variables);
  }

  onCancel() {
    this.cancel.emit();
  }

}
