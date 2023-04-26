import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { InstructorEventsService } from '../../../core/services/instructor-events-service';

@Component({
  selector: 'app-abm-Instructors',
  templateUrl: './abm-instructors.component.html',
  styleUrls: ['./abm-instructors.component.scss']
})
export class AbmInstructorsComponent {

  InstructorCreated = new EventEmitter<void>();

  idControl = new FormControl();
  register_dateControl = new FormControl();
  firstName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  firstName2Control = new FormControl('',[Validators.maxLength(30)]);
  lastName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  lastName2Control = new FormControl('', [Validators.maxLength(30)]);
  phoneControl = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  expertiseControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  InstructorsForm = new FormGroup({
    id: this.idControl,
    register_date: this.register_dateControl,
    firstName1: this.firstName1Control,
    firstName2: this.firstName2Control,
    lastName1: this.lastName1Control,
    lastName2: this.lastName2Control,
    phone: this.phoneControl,
    email: this.emailControl,
    expertise: this.expertiseControl
  });

  constructor(
    private dialogRef: MatDialogRef<AbmInstructorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private InstructorEventsService: InstructorEventsService
  ) {
    if (data.action === 'update') {
      this.setInstructorData(data.Instructor);
    }
  }

  setInstructorData(Instructor: any) {
    this.idControl.setValue(Instructor.id);
    this.register_dateControl.setValue(Instructor.register_date);
    this.firstName1Control.setValue(Instructor.firstName1);
    this.firstName2Control.setValue(Instructor.firstName2);
    this.lastName1Control.setValue(Instructor.lastName1);
    this.lastName2Control.setValue(Instructor.lastName2);
    this.phoneControl.setValue(Instructor.phone);
    this.emailControl.setValue(Instructor.email);
    this.expertiseControl.setValue(Instructor.expertise);
  }

  createInstructor(): void {
    if (this.InstructorsForm.valid) {
      this.dialogRef.close(this.InstructorsForm.value);
      this.InstructorEventsService.notifyInstructorCreated('ESTUDIANTE CREADO CON EXITO...');
    } else {
      this.InstructorsForm.markAllAsTouched();
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
