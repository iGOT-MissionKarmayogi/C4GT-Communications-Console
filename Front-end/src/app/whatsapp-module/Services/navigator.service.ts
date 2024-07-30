import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor() { }
  SelectedTemplate:string | null= null;
  private SelectedUsers: any[] = []; 
  SelectedOption:string="select-template";

  getSelectedTemplate():string|null{
    return this.SelectedTemplate;
  }
  getSelectedUsers(): any[] {
    return this.SelectedUsers;
  }
  getSelectedOption():string|null{
    return this.SelectedOption;
  }

  setSelectedTemplate(template:string):void{
    this.SelectedTemplate=template;
  }
  setSelectedUsers(users: any[]): void {
    console.log("Selected users list is changed");
    this.SelectedUsers = users;
  }
  setSelectedOption(option:string):void{
    this.SelectedOption=option;
  }

}
