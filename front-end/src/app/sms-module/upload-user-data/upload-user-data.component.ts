import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Papa } from 'ngx-papaparse';
import { FormsModule } from '@angular/forms';
import { TemplatePopupComponent } from '../template-popup/template-popup.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-upload-user-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TemplatePopupComponent,
    ToastModule,
    AgGridAngular,
  ],
  providers: [MessageService],
  templateUrl: './upload-user-data.component.html',
  styleUrls: ['./upload-user-data.component.css'],
})
export class UploadUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
  uploadSuccess: any;
  uploadError: any;
  users: { name: string; phoneNumber: string; checked: boolean }[] = [];
  newUser: { name: string; phoneNumber: string } = {
    name: '',
    phoneNumber: '',
  };
  columnDefs: ColDef[] = []; // Dynamic headers
  gridOptions: GridOptions = {
    defaultColDef: {
      checkboxSelection: true,
      filter: true,
    },
    rowSelection: 'multiple',
  };
  showAddForm = false;
  selectedTemplate: any;
  gridApi!: GridApi;
  rowData: any[] = [];
  selectedUsers: any[] = [];
  showFilePopup = false;
  showTemplatePopup = false;

  constructor(
    private http: HttpClient,
    private papa: Papa,
    private messageService: MessageService
  ) {}

  // CSV File Processing
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.papa.parse(file, {
        complete: (result) => {
          this.processCSV(result.data);
        },
        header: true,
      });
    }
  }

  // Process and validate CSV data
  processCSV(data: any[]) {
    if (data.length > 0) {
      // Normalize header names to find "name" and "phone number" variations
      const headers = Object.keys(data[0]);

      // Find possible variations of 'name' and 'phoneNumber'
      const nameField = headers.find((header) =>
        ['name', 'Name', 'fullName', 'fullname'].includes(header.toLowerCase())
      );

      const phoneField = headers.find((header) =>
        [
          'phone',
          'Phone',
          'phoneNumber',
          'PhoneNumber',
          'mobile',
          'Mobile',
        ].includes(header.toLowerCase())
      );

      if (!nameField || !phoneField) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'CSV must contain name and phone number columns',
        });
        return;
      }

      this.columnDefs = [
        { field: 'checkbox', checkboxSelection: true },
        ...headers.map((header) => ({
          field: header,
          filter: this.isDateColumn(data, header) ? 'agDateColumnFilter' : true,
        })),
      ];

      // Filter out rows that are missing name or phoneNumber fields
      const validData = data.filter(
        (user: any) => user[nameField] && user[phoneField]
      );

      if (validData.length > 0) {
        this.rowData = validData;
        // Add normalized data to the grid
        this.gridApi.applyTransaction({ add: validData });

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'CSV imported successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid CSV data. Both name and phone number are required.',
        });
      }
    }
  }

  // Helper function to detect date columns
  isDateColumn(data: any[], header: string): boolean {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const datePattern2 = /^\d{2}-\d{2}-\d{4}$/;
    return data.some(
      (row) => datePattern.test(row[header]) || datePattern2.test(row[header])
    );
  }

  // Trigger template selection
  handleTemplateSelection(template: any) {
    this.selectedTemplate = template;
    this.submitSms(); 
  }

  // Function to send data to the API after template selection
submitSms() {
  if (this.selectedTemplate && this.selectedUsers.length > 0) {
    const smsPayload = {
      users: this.selectedUsers,
      templateId: this.selectedTemplate._id,
      // add date and time
      date: new Date().toISOString(),
    };

    console.log('Sending SMS:', smsPayload);

    // Call your API endpoint to send SMS
    this.http
      .post('http://localhost:5000/api/templates/send', smsPayload, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'SMS Sent',
            detail: 'Messages have been sent successfully',
          });
          this.showTemplatePopup = false; // Close the popup after sending
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send SMS',
          });
          console.error('Error sending SMS:', error);
        },
      });
  } else {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please select users and a template before sending',
    });
  }
}

  // Handle SMS sending
  sendSMS() {
    const selectedNodes = this.gridApi.getSelectedNodes(); // Get selected nodes
    const selectedData = selectedNodes.map((node) => node.data); // Extract data from each node
    //extract name and phoneNumber from selected data
    this.selectedUsers = selectedData.map((user) => ({
      name: user.name || user.fullName || user.Name || user.FullName,
      phoneNumber:
        user.phoneNumber || user.PhoneNumber || user.phone || user.Phone,
    }));

    console.log('Selected Rows:', this.selectedUsers);

    if (this.selectedUsers.length > 0) {
      this.showTemplatePopup = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No users selected',
      });
    }
  }

  // AG Grid API ready
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onQuickFilterChanged(event: any) {
    this.gridApi.setGridOption('quickFilterText', event.target.value);
  }

  // Trigger CSV file selection input
  importFromCSV() {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click(); // Trigger the file selection dialog
  }
}
