import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentDialogComponent } from './dialog-components/student-dialog/student-dialog.component';
import { DeleteStudentDialogComponent } from './dialog-components/delete-student-dialog/delete-student-dialog.component';
import { LoginComponent } from './dialog-components/login/login/login.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DeleteClassSubjectDialogComponent } from './dialog-components/delete-classSubject-dialog/delete-classSubject-dialog.component';
import { DeleteEnrollDialogComponent } from './dialog-components/delete-enroll-dialog/delete-enroll-dialog.component';



@NgModule({
  declarations: [
    DialogsComponent,
    StudentDialogComponent,
    DeleteStudentDialogComponent,
    DeleteClassSubjectDialogComponent,
    DeleteEnrollDialogComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    DialogsComponent
  ]
})
export class DialogsModule { }
