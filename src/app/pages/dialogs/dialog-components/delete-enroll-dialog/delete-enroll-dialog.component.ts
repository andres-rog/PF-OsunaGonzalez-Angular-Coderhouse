import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-enroll-dialog',
  templateUrl: './delete-enroll-dialog.component.html',
  styleUrls: ['./delete-enroll-dialog.component.scss']
})

export class DeleteEnrollDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteEnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      name: string;
      message: string;
    }
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
