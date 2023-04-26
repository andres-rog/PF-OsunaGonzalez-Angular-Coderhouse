import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ClassSubject } from 'src/app/pages/classSubjects/class-subjects-table.component';

@Injectable({
  providedIn: 'root'
})
export class ClassSubjectEventsService {
  classSubjectCreated$: Subject<string> = new Subject();
  totalClassSubjects = new BehaviorSubject<number>(0);
  private classSubjects$ = new BehaviorSubject<ClassSubject[]>([
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

  notifyClassSubjectCreated(message: string): void {
    this.classSubjectCreated$.next(message);
  }

  
  getTotalClassSubjects() {
    return this.totalClassSubjects.asObservable();
  }

  //Fake load
  async updateTotalClassSubjects(count: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.totalClassSubjects.next(count);
        resolve(true);
      }, 3000);
    });
  }

  getClassSubjects(): Observable<ClassSubject[]> {
    return this.classSubjects$.asObservable();
  }
  
}
