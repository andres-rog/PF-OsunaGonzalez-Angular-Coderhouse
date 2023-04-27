import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentTableComponent } from './pages/students/studentTable.component';
import { EnrollTableComponent } from './pages/enroll/enroll-table.component';
import { ClassSubjectTableComponent } from './pages/classSubjects/class-subjects-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
      }
    ]
  },
  {
    //Uknown route, redirect to dashboard
    path: '**',
    redirectTo: 'dashboard'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
