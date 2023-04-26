import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-instructor-dialog',
  templateUrl: './delete-instructor-dialog.component.html',
  styleUrls: ['./delete-instructor-dialog.component.scss']
})

export class DeleteInstructorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteInstructorDialogComponent>,
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
