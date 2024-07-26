import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {}

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getUserValue(): any {
    return this.userSubject.getValue();
  }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  updateUser(user: any): void {
    const currentUser = this.userSubject.getValue();
    this.userSubject.next({ ...currentUser, ...user });
  }
}