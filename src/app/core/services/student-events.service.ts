import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/pages/tables/table.component';


@Injectable({
  providedIn: 'root'
})
export class StudentEventsService {
  studentCreated$: Subject<string> = new Subject();
  totalStudents = new BehaviorSubject<number>(0);
  private students$ = new BehaviorSubject<Student[]>([
    {
      id: 1,
      firstName1: 'Andres',
      firstName2: 'Roberto',
      lastName1: 'Osuna',
      lastName2: 'Gonzalez',
      phone: '5555555555',
      email: 'Andres.ROG@outlook.com',
      register_date: new Date()
    },
    {
      id: 2,
      firstName1: 'Test1',
      firstName2: 'Test2',
      lastName1: 'Test3',
      lastName2: 'Test4',
      phone: '1234567890',
      email: 'TEST@outlook.com',
      register_date: new Date()
    }
  ]);

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

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }
  
}
