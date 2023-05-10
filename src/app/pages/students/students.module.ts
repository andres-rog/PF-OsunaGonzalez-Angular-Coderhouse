import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTableComponent } from './studentTable.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '../dialogs/dialogs.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [StudentTableComponent, AbmStudentsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PipesModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    DialogsModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  exports: [StudentTableComponent],
})
export class StudentsModule {}
