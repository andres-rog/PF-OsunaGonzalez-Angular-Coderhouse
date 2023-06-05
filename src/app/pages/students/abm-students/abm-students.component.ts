import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentEventsService } from 'src/app/core/services/student-events.service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Student } from 'src/app/core/models';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrls: ['./abm-students.component.scss'],
})
export class AbmStudentsComponent {
  studentCreated = new EventEmitter<void>();
  studentUpdated = new EventEmitter<Student>();

  idControl = new FormControl();
  register_dateControl = new FormControl();
  firstName1Control = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
  ]);
  firstName2Control = new FormControl('', [Validators.maxLength(30)]);
  lastName1Control = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
  ]);
  lastName2Control = new FormControl('', [Validators.maxLength(30)]);
  phoneControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  studentsForm = new FormGroup({
    id: this.idControl,
    register_date: this.register_dateControl,
    firstName1: this.firstName1Control,
    firstName2: this.firstName2Control,
    lastName1: this.lastName1Control,
    lastName2: this.lastName2Control,
    phone: this.phoneControl,
    email: this.emailControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentEventsService: StudentEventsService
  ) {
    if (data.action === 'update') {
      this.setStudentData(data.student);
    }
  }

  setStudentData(student: any) {
    this.idControl.setValue(student.id);
    this.register_dateControl.setValue(student.register_date);
    this.firstName1Control.setValue(student.firstName1);
    this.firstName2Control.setValue(student.firstName2);
    this.lastName1Control.setValue(student.lastName1);
    this.lastName2Control.setValue(student.lastName2);
    this.phoneControl.setValue(student.phone);
    this.emailControl.setValue(student.email);
  }

  save(): void {
    if (this.studentsForm.valid) {
      const student: Student = {
        id: this.idControl.value,
        register_date: this.register_dateControl.value,
        firstName1: this.firstName1Control.value as string,
        firstName2: this.firstName2Control.value as string,
        lastName1: this.lastName1Control.value as string,
        lastName2: this.lastName2Control.value as string,
        phone: this.phoneControl.value as string,
        email: this.emailControl.value as string,
      };

      if (this.data.action === 'update') {
        this.studentEventsService
          .modifyStudent(student.id, student)
          .pipe(
            catchError((error) => {
              //console.error('Error', error);
              this.studentEventsService.notifyStudent('ERROR');
              return of(null);
            })
          )
          .subscribe((updatedStudent) => {
            if (updatedStudent) {
              this.dialogRef.close(updatedStudent);
              this.studentEventsService.notifyStudent(
                'ESTUDIANTE ACTUALIZADO CON EXITO...'
              );
            }
          });
      } else {
        this.studentEventsService
          .createStudent(student)
          .pipe(
            catchError((error) => {
              //console.error('Error', error);
              this.studentEventsService.notifyStudent('ERROR');
              return of(null);
            })
          )
          .subscribe((createdStudent) => {
            if (createdStudent) {
              this.dialogRef.close(createdStudent);
              this.studentEventsService.notifyStudent(
                'ESTUDIANTE CREADO CON EXITO...'
              );
            }
          });
      }
    } else {
      this.studentsForm.markAllAsTouched();
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
