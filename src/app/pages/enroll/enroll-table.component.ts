import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmEnrollComponent } from './abm-enroll/abm-enroll.component';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnrollEventsService } from '../../core/services/enroll-events-service';
import { DeleteEnrollDialogComponent } from '../dialogs/dialog-components/delete-enroll-dialog/delete-enroll-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
export interface Enroll {
  id: number;
  studentName: string;
  subjectName: string;
  enrollDate: Date;
  startDate: Date;
  endDate: Date;
  weekDays: string;
  startHour: string;
  endHour: string;
  cost: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './enroll-table.component.html',
  styleUrls: ['./enroll-table.component.scss']
})
export class EnrollTableComponent {

  private SortByEnrollDate = new BehaviorSubject<boolean>(false);
  totalEnroll$ = this.enrollEventsService.getTotalEnroll();

  dataSource = new MatTableDataSource<Enroll>();

  displayedColumns: string[] = [
    'id', 'studentName', 'subjectName', 'enrollDate', 'startDate', 'endDate',
    'weekDays', 'startHour', 'endHour', 'cost', 'delete/modify'
  ];
  notificationService: any;

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    public authService: AuthService,
    private enrollEventsService: EnrollEventsService
    ) {

      this.enrollEventsService.getEnroll().subscribe((enroll) =>{
        this.dataSource.data = enroll;
      })

      this.SortByEnrollDate
      .pipe(
        map(sortByDate => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByDate) {
              return new Date(a.enrollDate).getTime() - new Date(b.enrollDate).getTime();
            }
            return 0;
          });
        })
      )
      .subscribe(sortedEnroll => {
        this.dataSource.data = sortedEnroll;
      });

      // Initialize totalEnroll value
      this.enrollEventsService.updateTotalEnroll(this.dataSource.data.length);
     }


     openABMEnroll(): void {
      const dialog = this.matDialog.open(AbmEnrollComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.afterClosed().subscribe((value) => {
        if (value) {
          const newEnroll: Enroll = {
            id: this.dataSource.data.length + 1,
            ...value,
          };

          // Update enroll array and sort again
          this.dataSource.data = [...this.dataSource.data, newEnroll];

          this.SortByEnrollDate.next(this.SortByEnrollDate.value);
          this.enrollEventsService.updateTotalEnroll(this.dataSource.data.length);
        }
      });
    }

  deleteEnroll(enroll: Enroll) {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(DeleteEnrollDialogComponent, {
        data: {
          title: 'Eliminar Inscripcion',
          name: `${enroll.studentName} - ${enroll.subjectName}`,
          message: `¿Estás seguro de eliminar esta inscripcion?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.enrollEventsService.deleteEnroll(enroll.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(e => e.id !== enroll.id);
            this.SortByEnrollDate.next(this.SortByEnrollDate.value);
            this.enrollEventsService.updateTotalEnroll(this.dataSource.data.length);
          });
        }
      });
    });
  }

  modifyEnroll(enroll: any) {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(AbmEnrollComponent, {
        data: {
          action: 'update',
          Enroll: enroll
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.enrollEventsService.modifyEnroll(result.id, result).subscribe(updatedEnroll => {
            const index = this.dataSource.data.findIndex(s => s.id === updatedEnroll.id);
            if (index > -1) {
              this.dataSource.data[index] = updatedEnroll;
              this.dataSource._updateChangeSubscription();
              this.SortByEnrollDate.next(this.SortByEnrollDate.value);
            }
          });
        }
      });
    });
  }

  toggleSortByEnrollDate(checked: boolean): void {
    this.SortByEnrollDate.next(checked);
  }

}
