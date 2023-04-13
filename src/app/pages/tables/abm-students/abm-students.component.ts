import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrls: ['./abm-students.component.scss']
})
export class AbmStudentsComponent {

  firstName1Control = new FormControl('', [Validators.required]);
  firstName2Control = new FormControl('');
  lastName1Control = new FormControl('', [Validators.required]);
  lastName2Control = new FormControl('');
  phoneControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);

  studentsForm = new FormGroup({
    firstName1: this.firstName1Control,
    firstName2: this.firstName2Control,
    lastName1: this.lastName1Control,
    lastName2: this.lastName2Control,
    phone: this.phoneControl,
    email: this.emailControl
  });

  constructor(private dialogRef: MatDialogRef<AbmStudentsComponent>) {}


  guardar(): void {
    if (this.studentsForm.valid) {
      this.dialogRef.close(this.studentsForm.value)
    } else {
      this.studentsForm.markAllAsTouched();
    }
  }
}
