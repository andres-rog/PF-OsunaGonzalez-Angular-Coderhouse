import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/core/models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentEventsService {
  studentCreated$: Subject<string> = new Subject();
  totalStudents = new BehaviorSubject<number>(0);
  private students$ = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) { }

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
    console.log("GET STUDENT called");
    return this.http.get<Student[]>('http://localhost:3000/students');
  }

  deleteStudent(id: number): Observable<any> {
    console.log("DELETE STUDENT called");
    return this.http.delete(`http://localhost:3000/students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    console.log("CREATE STUDENT called");
    return this.http.post<Student>('http://localhost:3000/students', student);
  }

  modifyStudent(id: number, updatedStudent: Student): Observable<Student> {
    return this.http.put<Student>(`http://localhost:3000/students/${id}`, updatedStudent);
  }

}
