import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsComponent } from './dialogs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentDialogComponent } from './dialog-components/student-dialog/student-dialog.component';



@NgModule({
  declarations: [
    DialogsComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    DialogsComponent
  ]
})
export class DialogsModule { }
