import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-classSubject-dialog',
  templateUrl: './delete-classSubject-dialog.component.html',
  styleUrls: ['./delete-classSubject-dialog.component.scss']
})

export class DeleteClassSubjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClassSubjectDialogComponent>,
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
