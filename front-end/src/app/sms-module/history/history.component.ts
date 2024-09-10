import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public rowData: any[] = []; // Ensure this is initialized as an array
  public columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', filter: true, sortable: true },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      filter: true,
      sortable: true,
    },
    {
      field: 'TemplateId.templateId', // Correct reference to nested `templateId`
      headerName: 'Template ID',
      filter: true,
      sortable: true,
    },
    { field: 'date', headerName: 'Date', filter: true, sortable: true },
  ];

  public gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      filter: true,
      sortable: true,
    },
    rowSelection: 'single',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      }),
    };

    // Fetch data from the API
    this.http
      .get<any[]>('http://localhost:5000/api/templates/history', httpOptions)
      .subscribe({
        next: (data:any) => {
          console.log('Data fetched from API:', data); // Debug the data response

          // Ensure data is an array, or convert it to an array if necessary
          if (Array.isArray(data.data)) {
            this.rowData = data.data; // Assign the response data if it's an array
          } else {
            console.error('API response is not an array:', data);
            this.rowData = []; // Fallback to empty array
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.rowData = []; // Fallback to empty array on error
        },
      });
  }
}
