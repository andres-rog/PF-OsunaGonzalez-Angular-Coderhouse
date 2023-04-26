import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './pages/tables/table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'students',
        component: TableComponent 
      },
      {
        path: 'instructors',
        component: TableComponent //InstructorTableComponent
      },
      {
        path: 'classes',
        component: TableComponent //ClassTableComponent
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
