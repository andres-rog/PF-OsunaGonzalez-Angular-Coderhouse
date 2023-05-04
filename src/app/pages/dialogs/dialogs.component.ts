import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './dialog-components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent {

  constructor(
    private dialogService: MatDialog
  ) {}



  openStudentDialog(): void {
    const dialog = this.dialogService.open(StudentDialogComponent, {
      data: {
        student: {
          firstName1: '',
          firstName2: '',
          lastName1: '',
          lastName2: '',
          phone: '',
          email: ''
        }
      }
    });
  }
}
