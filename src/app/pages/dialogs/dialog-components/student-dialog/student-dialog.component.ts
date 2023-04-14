import { Component, Inject, Input} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  student: {
    firstName1: string;
    firstName2: string;
    lastName1: string;
    lastName2: string;
    phone: string;
    email: string;
  }
}

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent {
  @Input() action: 'create' | 'update';
  @Input() studentData: any;

  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data.action;
    this.studentData = data.student;
  }

}
