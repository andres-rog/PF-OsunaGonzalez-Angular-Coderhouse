import { Injectable, OnDestroy } from '@angular/core';
import { StudentEventsService } from './student-events.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService implements OnDestroy {
  private subscription: Subscription;

  constructor(
    private studentEventsService: StudentEventsService,
    private snackBar: MatSnackBar
  ) {
    this.subscription = this.studentEventsService.studentCreated$.subscribe((message: string) => {
      this.showNotification(message);
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
