import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-upload-WhatsApp-user-data',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './upload-user-data.component.html',
  styleUrl: './upload-user-data.component.css'
})




export class UploadWhatsappUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
uploadSuccess: any;
uploadError: any;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result;
    };
    reader.readAsText(file);
  }

  onSubmit() {
    if (this.fileContent) {
      try {
        const users = JSON.parse(this.fileContent.toString());
        this.http.post('http://localhost:5001/upload-users', users).subscribe({
          next: (response) => {
            console.log('Users uploaded successfully:', response);
            const uploadSuccess=true
          },
          error: (error) => {
            console.error('Error uploading users:', error);
            const uploadError=true
          }
        });
      } catch (error) {
        console.error('Invalid JSON format:', error);
      }
    }
  }
}





