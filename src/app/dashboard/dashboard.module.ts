import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogsModule } from '../pages/dialogs/dialogs.module';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatListModule} from '@angular/material/list';
import { StudentsModule } from '../pages/students/students.module';
import { InstructorsModule } from '../pages/instructors/instructors.module';
import { ClassSubjectsModule } from '../pages/classSubjects/class-subjects.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    DialogsModule,
    MatDividerModule,
    RouterModule,
    MatListModule,
    StudentsModule,
    InstructorsModule,
    ClassSubjectsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
