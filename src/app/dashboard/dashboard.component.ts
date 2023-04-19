import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../pages/dialogs/dialog-components/login/login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;

  constructor(
    private dialog: MatDialog
  ) { }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('LoginDialog Closed', result);
    });
  }
}
