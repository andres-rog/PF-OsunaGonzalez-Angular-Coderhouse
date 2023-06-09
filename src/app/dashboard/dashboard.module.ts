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
import { EnrollsModule } from '../pages/enroll/enroll.module';
import { ClassSubjectsModule } from '../pages/classSubjects/class-subjects.module';
import { StudentTableComponent } from '../pages/students/studentTable.component';
import { EnrollTableComponent } from '../pages/enroll/enroll-table.component';
import { ClassSubjectTableComponent } from '../pages/classSubjects/class-subjects-table.component';
import { UserTableComponent } from '../pages/users/userTable.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UsersModule } from '../pages/users/users.module';
import { LoginGuard } from '../auth/guards/login.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
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
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'students',
            component: StudentTableComponent //Students
          },
          {
            path: 'enroll',
            component: EnrollTableComponent //Enrolling
          },
          {
            path: 'subjects',
            component: ClassSubjectTableComponent //Subjects
          },
          {
            path: 'users',
            component: UserTableComponent, //Users
            canActivate: [AdminGuard]
          },
        ]
      },
    ]),
    MatListModule,
    StudentsModule,
    EnrollsModule,
    ClassSubjectsModule,
    UsersModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
