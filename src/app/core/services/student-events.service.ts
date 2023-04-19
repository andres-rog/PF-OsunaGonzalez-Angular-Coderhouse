import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentEventsService {
  studentCreated$: Subject<string> = new Subject();

  constructor() { }

  notifyStudentCreated(message: string): void {
    this.studentCreated$.next(message);
  }
}
