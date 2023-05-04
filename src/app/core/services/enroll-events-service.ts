import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Enroll } from 'src/app/pages/enroll/enroll-table.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollEventsService {
  EnrollCreated$: Subject<string> = new Subject();
  totalEnroll = new BehaviorSubject<number>(0);
  private Enroll$ = new BehaviorSubject<Enroll[]>([]);

  constructor(private http: HttpClient) { }

  notifyEnroll(message: string): void {
    this.EnrollCreated$.next(message);
  }

  getTotalEnroll() {
    return this.totalEnroll.asObservable();
  }

  //Fake load
  async updateTotalEnroll(count: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.totalEnroll.next(count);
        resolve(true);
      }, 3000);
    });
  }

  getEnroll(): Observable<Enroll[]> {
    return this.http.get<Enroll[]>('http://localhost:3000/enrolls');
  }

  deleteEnroll(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/enrolls/${id}`);
  }

  createEnroll(enroll: Enroll): Observable<Enroll> {
    return this.http.post<Enroll>('http://localhost:3000/enrolls', enroll);
  }

  modifyEnroll(id: number, enroll: Enroll): Observable<Enroll> {
    return this.http.put<Enroll>(`http://localhost:3000/enrolls/${id}`, enroll);
  }

}
