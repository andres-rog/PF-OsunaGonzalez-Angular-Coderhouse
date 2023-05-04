import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { EnrollEventsService } from 'src/app/core/services/enroll-events-service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Enroll } from 'src/app/core/models';

@Component({
  selector: 'app-abm-Enroll',
  templateUrl: './abm-enroll.component.html',
  styleUrls: ['./abm-enroll.component.scss'],
  providers: [DatePipe]
})
export class AbmEnrollComponent {

  EnrollCreated = new EventEmitter<void>();

  idControl = new FormControl();
  studentNameControl = new FormControl('', [Validators.required]);
  subjectNameControl = new FormControl('', [Validators.required]);
  enrollDateControl = new FormControl('', [Validators.required]);
  startDateControl = new FormControl('', [Validators.required]);
  endDateControl = new FormControl('', [Validators.required]);
  weekDaysControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  startHourControl = new FormControl('', [Validators.required, Validators.maxLength(5)]);
  endHourControl = new FormControl('', [Validators.required, Validators.maxLength(5)]);
  costControl = new FormControl('', [Validators.required]);

  EnrollForm = new FormGroup({
    id: this.idControl,
    studentName: this.studentNameControl,
    subjectName: this.subjectNameControl,
    enrollDate: this.enrollDateControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
    weekDays: this.weekDaysControl,
    startHour: this.startHourControl,
    endHour: this.endHourControl,
    cost: this.costControl
  });

  constructor(
    private dialogRef: MatDialogRef<AbmEnrollComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private EnrollEventsService: EnrollEventsService,
    public datePipe: DatePipe
  ) {
    if (data.action === 'update') {
      this.setEnrollData(data.Enroll);
    }
  }

  setEnrollData(Enroll: any) {
    this.idControl.setValue(Enroll.id);
    this.studentNameControl.setValue(Enroll.studentName);
    this.subjectNameControl.setValue(Enroll.subjectName);
    this.enrollDateControl.setValue(this.datePipe.transform(Enroll.enrollDate, 'yyyy-MM-dd'));
    this.startDateControl.setValue(this.datePipe.transform(Enroll.startDate, 'yyyy-MM-dd'));
    this.endDateControl.setValue(this.datePipe.transform(Enroll.endDate, 'yyyy-MM-dd'));
    this.weekDaysControl.setValue(Enroll.weekDays);
    this.startHourControl.setValue(Enroll.startHour);
    this.endHourControl.setValue(Enroll.endHour);
    this.costControl.setValue(Enroll.cost);
  }


  save(): void {
    if (this.EnrollForm.valid) {
      const enroll: Enroll = {
        id: this.idControl.value,
        studentName: this.studentNameControl.value as string,
        subjectName: this.subjectNameControl.value as string,
        enrollDate: new Date(this.enrollDateControl.value as string),
        startDate: new Date(this.startDateControl.value as string),
        endDate: new Date(this.endDateControl.value as string),
        weekDays: this.weekDaysControl.value as string,
        startHour: this.startHourControl.value as string,
        endHour: this.endHourControl.value as string,
        cost: this.costControl.value as unknown as number
      };

      if (this.data.action === 'update') {
        this.EnrollEventsService.modifyEnroll(enroll.id, enroll).pipe(
          catchError((error) => {
            console.error('Error', error);
            this.EnrollEventsService.notifyEnroll('ERROR');
            return of(null);
          })
        ).subscribe((updatedEnroll) => {
          if (updatedEnroll) {
            this.dialogRef.close(updatedEnroll);
            this.EnrollEventsService.notifyEnroll('INSCRIPCION ACTUALIZADA CON EXITO...');
          }
        });
      } else {
        this.EnrollEventsService.createEnroll(enroll).pipe(
          catchError((error) => {
            console.error('Error', error);
            this.EnrollEventsService.notifyEnroll('ERROR');
            return of(null);
          })
        ).subscribe((createdEnroll) => {
          if (createdEnroll) {
            this.dialogRef.close(createdEnroll);
            this.EnrollEventsService.notifyEnroll('INSCRIPCION CREADA CON EXITO...');
          }
        });
      }
    } else {
      this.EnrollForm.markAllAsTouched();
    }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
