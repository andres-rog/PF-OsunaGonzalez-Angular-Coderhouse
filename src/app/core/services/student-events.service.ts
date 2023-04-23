import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentEventsService {
  studentCreated$: Subject<string> = new Subject();
  totalStudents = new BehaviorSubject<number>(0);

  constructor() { }

  notifyStudentCreated(message: string): void {
    this.studentCreated$.next(message);
  }

  
  getTotalStudents() {
    return this.totalStudents.asObservable();
  }

  //Fake load
  async updateTotalStudents(count: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.totalStudents.next(count);
        resolve(true);
      }, 3000);
    });
  }
  
}
