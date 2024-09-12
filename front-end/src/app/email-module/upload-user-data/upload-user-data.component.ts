import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-upload-user-data',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './upload-user-data.component.html',
  styleUrl: './upload-user-data.component.css'
})


export class UploadUserDataComponent {
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  fileSelected: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileSelected = true;
    } else{
      this.fileSelected = false;
    }
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        await this.http.post('http://localhost:5000/api/email/upload-user-data', formData).toPromise();
        this.uploadSuccess = true;
        this.uploadError = false;
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          console.error('Error uploading file:', error);
        }
        this.uploadSuccess = false;
        this.uploadError = true;
      }
    } else {
      this.uploadError = true;
    }
  }
}