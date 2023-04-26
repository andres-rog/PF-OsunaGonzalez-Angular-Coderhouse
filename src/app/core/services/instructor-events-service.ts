import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Instructor } from 'src/app/pages/instructors/instructors-table.component';


@Injectable({
  providedIn: 'root'
})
export class InstructorEventsService {
  InstructorCreated$: Subject<string> = new Subject();
  totalInstructors = new BehaviorSubject<number>(0);
  private Instructors$ = new BehaviorSubject<Instructor[]>([
    {
      id: 1,
      firstName1: 'Andres',
      firstName2: 'Roberto',
      lastName1: 'Osuna',
      lastName2: 'Gonzalez',
      phone: '5555555555',
      email: 'Andres.ROG@outlook.com',
      expertise: '.Net C#, Automation and Electronics',
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
      expertise: 'Angular Full Stack',
      register_date: new Date()
    }
  ]);

  constructor() { }

  notifyInstructorCreated(message: string): void {
    this.InstructorCreated$.next(message);
  }

  
  getTotalInstructors() {
    return this.totalInstructors.asObservable();
  }

  //Fake load
  async updateTotalInstructors(count: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.totalInstructors.next(count);
        resolve(true);
      }, 3000);
    });
  }

  getInstructors(): Observable<Instructor[]> {
    return this.Instructors$.asObservable();
  }
  
}
