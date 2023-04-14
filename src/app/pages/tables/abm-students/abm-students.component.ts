import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrls: ['./abm-students.component.scss']
})
export class AbmStudentsComponent {

  idControl = new FormControl();
  register_dateControl = new FormControl();
  firstName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  firstName2Control = new FormControl('',[Validators.maxLength(30)]);
  lastName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  lastName2Control = new FormControl('', [Validators.maxLength(30)]);
  phoneControl = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  studentsForm = new FormGroup({
    id: this.idControl,
    register_date: this.register_dateControl,
    firstName1: this.firstName1Control,
    firstName2: this.firstName2Control,
    lastName1: this.lastName1Control,
    lastName2: this.lastName2Control,
    phone: this.phoneControl,
    email: this.emailControl
  });

  constructor(
    private dialogRef: MatDialogRef<AbmStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.action === 'update') {
      this.setStudentData(data.student);
    }
  }

  setStudentData(student: any) {
    console.log(student);
    this.idControl.setValue(student.id);
    this.register_dateControl.setValue(student.register_date);
    this.firstName1Control.setValue(student.firstName1);
    this.firstName2Control.setValue(student.firstName2);
    this.lastName1Control.setValue(student.lastName1);
    this.lastName2Control.setValue(student.lastName2);
    this.phoneControl.setValue(student.phone);
    this.emailControl.setValue(student.email);
  }

  guardar(): void {
    if (this.studentsForm.valid) {
      this.dialogRef.close(this.studentsForm.value);
    } else {
      this.studentsForm.markAllAsTouched();
    }
  }
}
