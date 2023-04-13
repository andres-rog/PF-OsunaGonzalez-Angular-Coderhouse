import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrls: ['./abm-students.component.scss']
})
export class AbmStudentsComponent {

  nameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);

  studentsForm = new FormGroup({
    nombre: this.nameControl,
    apellido: this.lastNameControl,
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
