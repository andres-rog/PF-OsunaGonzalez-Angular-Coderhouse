import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ClassSubject } from 'src/app/pages/classSubjects/class-subjects-table.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassSubjectEventsService {
  classSubjectCreated$: Subject<string> = new Subject();
  totalClassSubjects = new BehaviorSubject<number>(0);
  private classSubjects$ = new BehaviorSubject<ClassSubject[]>([]);

  constructor(private http: HttpClient) { }

  notifyClassSubject(message: string): void {
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
    return this.http.get<ClassSubject[]>('http://localhost:3000/subjects');
  }

  deleteClassSubject(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/subjects/${id}`);
  }

  createClassSubject(classSubject: ClassSubject): Observable<ClassSubject> {
    return this.http.post<ClassSubject>('http://localhost:3000/subjects', classSubject);
  }

  modifyClassSubject(id: number, classSubject: ClassSubject): Observable<ClassSubject> {
    return this.http.put<ClassSubject>(`http://localhost:3000/subjects/${id}`, classSubject);
  }

}
