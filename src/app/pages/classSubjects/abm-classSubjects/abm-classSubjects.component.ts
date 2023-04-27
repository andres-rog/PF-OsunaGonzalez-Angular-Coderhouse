import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassSubjectEventsService } from 'src/app/core/services/classSubjects-events-service';
import { EventEmitter } from '@angular/core';

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
    console.log(classSubject);
    this.idControl.setValue(classSubject.id);
    this.titleControl.setValue(classSubject.title);
    this.timePerClassControl.setValue(classSubject.timePerClass);
    this.totalClassesControl.setValue(classSubject.totalClasses);
    this.classesPerWeekControl.setValue(classSubject.classesPerWeek);
    this.difficultyControl.setValue(classSubject.difficulty);
  }

  createClassSubject(): void {
    if (this.classSubjectsForm.valid) {
      this.dialogRef.close(this.classSubjectsForm.value);
      this.classSubjectEventsService.notifyClassSubjectCreated('ESTUDIANTE CREADO CON EXITO...');
    } else {
      this.classSubjectsForm.markAllAsTouched();
    }
  }

}
