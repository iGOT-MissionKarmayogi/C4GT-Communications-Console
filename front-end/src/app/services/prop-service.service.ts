import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropServiceService {

  constructor() { }
  medium:string|null=null;
  senderNumber:string|null='919027527049';
  private selectedTemplate: any = null;
  
  getSenderNumber():string|null{
    return this.senderNumber;
  }
  setSenderNumber(senderNumber:string):void{
    this.senderNumber=senderNumber;
  }

  getSelectedTemplate(): any {
    return this.selectedTemplate;
  }

  setSelectedTemplate(template: any): void {
    this.selectedTemplate = template;
  }


  getMedium():string|null{
    return this.medium
  }

  setMedium(medium:string|null):void{
    this.medium=medium
  }
}
