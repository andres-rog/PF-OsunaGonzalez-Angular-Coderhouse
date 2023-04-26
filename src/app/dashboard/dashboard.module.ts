import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogsModule } from '../pages/dialogs/dialogs.module';
import {MatDividerModule} from '@angular/material/divider';
import { TableModule } from '../pages/tables/table.module';
import { RouterModule } from '@angular/router';
import { MatListModule} from '@angular/material/list';

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
    TableModule,
    MatDividerModule,
    RouterModule,
    MatListModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
