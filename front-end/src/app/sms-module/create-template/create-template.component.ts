import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule
  ],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
  templateForm: FormGroup;
  predefinedVariables = ['username', 'date', 'time']; // Example predefined variables
  showSuccessMessage: boolean | undefined;
  tooltipText: string = `Please enter the same template body which you get verified on your DLT platform and please use {{}} for your variable name like {{name}};`;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      variables: this.fb.array([]) // Dynamic form array for variables
    });
  }

  get variablesArray() {
    return this.templateForm.get('variables') as FormArray;
  }

  onBodyChange(event: any) {
    const bodyValue = event.target.value;
    const varPattern = /\{\{(\w+)\}\}/g;
    const currentVariables = new Map<string, number>(); // Track variables with unique indices
    let match;

    // Find all variables in the body text
    while ((match = varPattern.exec(bodyValue)) !== null) {
      const varName = match[1];
      const index = currentVariables.get(varName) || 0;
      currentVariables.set(varName, index + 1);
    }

    // Remove variables that are no longer in the body
    this.variablesArray.controls.forEach((control, index) => {
      const varName = control.get('name')?.value;
      const varCount = currentVariables.get(varName) || 0;
      const existingCount = (this.variablesArray.controls.filter(c => c.get('name')?.value === varName)).length;

      if (existingCount > varCount) {
        this.variablesArray.removeAt(index);
      }
    });

    // Add new variables
    currentVariables.forEach((count, varName) => {
      const existingCount = (this.variablesArray.controls.filter(c => c.get('name')?.value === varName)).length;
      for (let i = existingCount; i < count; i++) {
        this.addVariableControl(varName);
      }
    });
  }

  addVariableControl(varName: string) {
    const variableGroup = this.fb.group({
      name: [varName],
      type: ['predefined', Validators.required],
      value: ['', Validators.required]
    });

    this.variablesArray.push(variableGroup);
  }

  onVariableTypeChange(index: number, event: any) {
    const type = event.target.value;
    const control = this.variablesArray.at(index);
    if (type === 'predefined') {
      control.get('value')?.setValue('');
      control.get('value')?.setValidators(Validators.required);
    } else {
      control.get('value')?.setValue('');
      control.get('value')?.setValidators(Validators.required);
    }
    control.get('value')?.updateValueAndValidity();
  }

  onSubmit() {
    const templateData = this.templateForm.value;
    console.log('Template data:', templateData);
    this.http.post('http://localhost:5000/api/templates/create', templateData,{withCredentials: true})
      .subscribe({
        next: (response) => {
          console.log('Template created successfully:', response);
          this.showSuccessMessage = true;
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating template:', error);
        }
      });
  }

  resetForm() {
    this.templateForm.reset();
    this.variablesArray.clear();
  }
}
