import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserEventsService {
  userCreated$: Subject<string> = new Subject();
  totalUsers = new BehaviorSubject<number>(0);
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  notifyUser(message: string): void {
    this.userCreated$.next(message);
  }


  getTotalUsers() {
    return this.totalUsers.asObservable();
  }

  //Fake load
  async updateTotalUsers(count: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.totalUsers.next(count);
        resolve(true);
      }, 3000);
    });
  }

  generateRandomToken(length: number = 50): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }

  createUser(user: User): Observable<User> {
    user.token = this.generateRandomToken();
    return this.http.post<User>('http://localhost:3000/user', user);
  }

  modifyUser(id: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/user/${id}`, updatedUser);
  }

}
