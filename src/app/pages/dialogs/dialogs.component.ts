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
          firstName: 'josue2',
          lastName: 'baez',
        }
      }
    });

    dialog.afterClosed()
      .subscribe((value) => console.log(value));
  }
}
