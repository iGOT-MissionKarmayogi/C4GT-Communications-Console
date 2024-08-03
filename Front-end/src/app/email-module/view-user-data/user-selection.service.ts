// user-selection.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UserSelectionService {
  public selectedUsers: any[] = [];

  addSelectedUser(user: any) {
    this.selectedUsers.push(user);
  }

  getSelectedUsers() {
    return this.selectedUsers;
  }

  clearSelectedUsers() {
    this.selectedUsers = [];
  }
  setSelectedUsers(users: any[]) {
    this.selectedUsers = users;
  }
  constructor() {}
}