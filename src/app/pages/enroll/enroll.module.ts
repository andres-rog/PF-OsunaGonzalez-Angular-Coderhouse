import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbmEnrollComponent } from './abm-enroll/abm-enroll.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '../dialogs/dialogs.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EnrollTableComponent } from './enroll-table.component';


@NgModule({
  declarations: [
    AbmEnrollComponent,
    EnrollTableComponent
  ],
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
  ],
  exports: [
  ]
})
export class EnrollsModule { }
