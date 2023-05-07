import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassSubjectEventsService } from 'src/app/core/services/classSubjects-events-service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClassSubject } from 'src/app/core/models'; // Import the ClassSubject model if it exists

@Component({
  selector: 'app-abm-classSubjects',
  templateUrl: './abm-classSubjects.component.html',
  styleUrls: ['./abm-classSubjects.component.scss']
})
export class AbmClassSubjectsComponent {

  classSubjectCreated = new EventEmitter<void>();

  idControl = new FormControl();
  titleControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  timePerClassControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  totalClassesControl = new FormControl('', [Validators.required]);
  classesPerWeekControl = new FormControl('', [Validators.required]);
  difficultyControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  classSubjectsForm = new FormGroup({
    id: this.idControl,
    title: this.titleControl,
    timePerClass: this.timePerClassControl,
    totalClasses: this.totalClassesControl,
    classesPerWeek: this.classesPerWeekControl,
    difficulty: this.difficultyControl
  });

  constructor(
    private dialogRef: MatDialogRef<AbmClassSubjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classSubjectEventsService: ClassSubjectEventsService
  ) {
    if (data.action === 'update') {
      this.setClassSubjectData(data.classSubject);
    }
  }

  setClassSubjectData(classSubject: any) {
    this.idControl.setValue(classSubject.id);
    this.titleControl.setValue(classSubject.title);
    this.timePerClassControl.setValue(classSubject.timePerClass);
    this.totalClassesControl.setValue(classSubject.totalClasses);
    this.classesPerWeekControl.setValue(classSubject.classesPerWeek);
    this.difficultyControl.setValue(classSubject.difficulty);
  }

  save(): void {
    if (this.classSubjectsForm.valid) {
      const classSubject: ClassSubject = {
        id: this.idControl.value,
        title: this.titleControl.value as string,
        timePerClass: this.timePerClassControl.value as string,
        totalClasses: this.totalClassesControl.value as unknown as number,
        classesPerWeek: this.classesPerWeekControl.value as unknown as number,
        difficulty: this.difficultyControl.value as string
      };

      if (this.data.action === 'update') {
        this.classSubjectEventsService.modifyClassSubject(classSubject.id, classSubject).pipe(
          catchError((error) => {
            console.error('Error:', error);
            this.classSubjectEventsService.notifyClassSubject('ERROR');
            return of(null);
          })
        ).subscribe((updatedClassSubject) => {
          if (updatedClassSubject) {
            this.dialogRef.close(updatedClassSubject);
            this.classSubjectEventsService.notifyClassSubject('MATERIA ACTUALIZADA CON EXITO...');
          }
        });
      } else {
        this.classSubjectEventsService.createClassSubject(classSubject).pipe(
          catchError((error) => {
            console.error('Error:', error);
            return of(null);
          })
        ).subscribe((createdClassSubject) => {
          if (createdClassSubject) {
            this.dialogRef.close(createdClassSubject);
            this.classSubjectEventsService.notifyClassSubject('MATERIA CREADA CON EXITO...');
          }
        });
      }
    } else {
      this.classSubjectsForm.markAllAsTouched();
    }
  }


}
