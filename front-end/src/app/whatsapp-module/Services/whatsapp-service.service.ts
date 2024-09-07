import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropServiceService } from '../../services/prop-service.service';

@Injectable({
  providedIn: 'root'
})
export class WhatsappTemplateService {

  private apiUrl = 'http://localhost:5000/api/whatsapp'; // Corrected the base URL

  constructor(private http: HttpClient, private propService: PropServiceService) { }

  getTemplates(): Observable<any> {
    const senderNumber = this.propService.getSenderNumber();
    if (!senderNumber) {
      throw new Error('Sender number is not set');
    }
    const params = new HttpParams().set('senderNumber', senderNumber);
    return this.http.get(`${this.apiUrl}/templates`, {withCredentials:true, params });
  }

  getSingleTemplate(templateId: string): Observable<any> {
    const senderNumber = this.propService.getSenderNumber();
    if (!senderNumber) {
      throw new Error('Sender number is not set');
    }
    let params = new HttpParams().set('senderNumber', senderNumber);
    params = params.append('templateId', templateId);
    return this.http.get(`${this.apiUrl}/template`, { withCredentials: true,params });
  }

  createTemplate(template: any): Observable<any> {
    const senderNumber = this.propService.getSenderNumber();
    if (!senderNumber) {
      throw new Error('Sender number is not set');
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { senderNumber, ...template };
    return this.http.post(`${this.apiUrl}/template/create`, body, { headers,withCredentials:true, });
  }

  deleteTemplate(id: string): Observable<any> {
    const senderNumber = this.propService.getSenderNumber();
    if (!senderNumber) {
      throw new Error('Sender number is not set');
    }
    const body = { senderNumber };
    return this.http.request('delete', `${this.apiUrl}/template/delete/${id}`, { body });
  }

  modifyTemplate(template: any): Observable<any> {
    const senderNumber = this.propService.getSenderNumber();
    if (!senderNumber) {
      throw new Error('Sender number is not set');
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { senderNumber, ...template };
    return this.http.patch(`${this.apiUrl}/template/modify`, body, { headers, withCredentials: true });
}


  sendMessage(messageData: any): Observable<any> {
    console.log("This data will be passed to backend: ",messageData)
    return this.http.post(`${this.apiUrl}/message`, messageData, { withCredentials:true});
  }
}
