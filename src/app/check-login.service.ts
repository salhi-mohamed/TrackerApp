import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {
  private registeredUsers = [
    { email: 'test@example.com', password: 'Password123!' },//liste des utilisateurs
    { email: 'sample@example.com', password: 'Password456!' }
  ];

  constructor() { }

  emailExists(email: string): boolean {
    return this.registeredUsers.some(user => user.email === email);// verifier l existence d un email
  }

  userExists(email: string, password: string): boolean {
    return this.registeredUsers.some(user => user.email === email && user.password === password);// verifier l existence d'un user
  }

  addUser(email: string, password: string) {
    this.registeredUsers.push({ email, password });// ajout d 'un nouveau user 
  }

  updateUser(oldEmail: string, newEmail: string) {
    const user = this.registeredUsers.find(user => user.email === oldEmail);// update email dans EditProfile
    if (user) {
      user.email = newEmail;
    }
  }
}