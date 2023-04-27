import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Enroll } from 'src/app/pages/enroll/enroll-table.component';

@Injectable({
  providedIn: 'root'
})
export class EnrollEventsService {
  EnrollCreated$: Subject<string> = new Subject();
  totalEnroll = new BehaviorSubject<number>(0);
  private Enroll$ = new BehaviorSubject<Enroll[]>([
    {
      id: 1,
      studentName: 'Andres Osuna',
      subjectName: 'Angular',
      enrollDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      weekDays: 'Lunes, Miercoles',
      startHour: '09:00',
      endHour: '11:00',
      cost: 100
    },
    {
      id: 2,
      studentName: 'Test1 Test2',
      subjectName: 'C# .NET',
      enrollDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      weekDays: 'Martes, Jueves',
      startHour: '14:00',
      endHour: '16:00',
      cost: 150
    }
  ]);

  constructor() { }

  notifyEnrollCreated(message: string): void {
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
    return this.Enroll$.asObservable();
  }
}