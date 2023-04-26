import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmClassSubjectsComponent } from './abm-classSubjects/abm-classSubjects.component';
import { DeleteClassSubjectDialogComponent } from '../dialogs/dialog-components/delete-classSubject-dialog/delete-classSubject-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassSubjectEventsService } from 'src/app/core/services/classSubjects-events-service';

export interface ClassSubject {
  id: number;
  firstName1: string;
  firstName2: string;
  lastName1: string;
  lastName2: string;
  phone: string;
  email: string;
  register_date: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './class-subjects-table.component.html',
  styleUrls: ['./class-subjects-table.component.scss']
})
export class ClassSubjectTableComponent {

  private sortByNames = new BehaviorSubject<boolean>(false);
  totalClassSubjects$ = this.classSubjectEventsService.getTotalClassSubjects();

  dataSource = new MatTableDataSource<ClassSubject>();

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'phone', 'email', 'register_date', 'delete/modify'];

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationsService,
    private classSubjectEventsService: ClassSubjectEventsService
    ) {

      this.classSubjectEventsService.getClassSubjects().subscribe((classSubject) =>{
        this.dataSource.data = classSubject;
      })

      this.sortByNames
      .pipe(
        map(sortByName => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByName) {
              const aCompleteClassSubjectName = `${a.firstName1} ${a.firstName2} ${a.lastName1} ${a.lastName2}`;
              const bCompleteClassSubjectName = `${b.firstName1} ${b.firstName2} ${b.lastName1} ${b.lastName2}`;
              return aCompleteClassSubjectName.localeCompare(bCompleteClassSubjectName);
            }
            return 0;
          });
        })
      )
      .subscribe(sortedClassSubjects => {
        this.dataSource.data = sortedClassSubjects;
      });

      // Initialize totalClassSubjects value
      this.classSubjectEventsService.updateTotalClassSubjects(this.dataSource.data.length);
     }


     openABMClassSubject(): void {
      const dialog = this.matDialog.open(AbmClassSubjectsComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.componentInstance.classSubjectCreated.subscribe(() => {
        this.notificationService.showNotification('ClassSubject created successfully');
      });

      dialog.afterClosed().subscribe((value) => {
        console.log(value);
        if (value) {
          const newClassSubject = {
            ...value,
            register_date: new Date(),
            id: this.dataSource.data.length + 1,
          };

          // Update classSubject array and sort again
          this.dataSource.data = [...this.dataSource.data, newClassSubject];

          this.sortByNames.next(this.sortByNames.value);
          this.classSubjectEventsService.updateTotalClassSubjects(this.dataSource.data.length);
        }
      });
    }

  logClassSubject(classSubject: any) {
    console.log(classSubject);
  }

  deleteClassSubject(classSubject: any) {
    const dialogRef = this.matDialog.open(DeleteClassSubjectDialogComponent, {
      data: {
        title: 'Eliminar',
        name: `${classSubject.firstName1} ${classSubject.firstName2} ${classSubject.lastName1} ${classSubject.lastName2}`,
        message: `¿Estás seguro de eliminar el registro de este alumno?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === classSubject.id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.sortByNames.next(this.sortByNames.value);
          this.classSubjectEventsService.updateTotalClassSubjects(this.dataSource.data.length);
        }
      }
    });
  }

  modifyClassSubject(classSubject: any) {
    const dialogRef = this.matDialog.open(AbmClassSubjectsComponent, {
      data: {
        action: 'update',
        classSubject: classSubject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === result.id);
        console.log(index);
        if (index > -1) {
          console.log(result);
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();

          // Update classSubject array and sort again
          this.dataSource.data[index] = result;
          this.sortByNames.next(this.sortByNames.value);
        }
      }
    });
  }

  toggleSortByName(checked: boolean): void {
    this.sortByNames.next(checked);
  }

}
