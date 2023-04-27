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
      title: 'Angular',
      timePerClass: '2 horas',
      totalClasses: 24,
      classesPerWeek: 2,
      difficulty: 'Avanzado'
    },
    {
      id: 2,
      title: 'C# .NET',
      timePerClass: '1.5 horas',
      totalClasses: 30,
      classesPerWeek: 2,
      difficulty: 'Intermedio'
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
