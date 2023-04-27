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
  title: string;
  timePerClass: string;
  totalClasses: number;
  classesPerWeek: number;
  difficulty: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './class-subjects-table.component.html',
  styleUrls: ['./class-subjects-table.component.scss']
})
export class ClassSubjectTableComponent {

  private sortByTitle = new BehaviorSubject<boolean>(false);
  totalClassSubjects$ = this.classSubjectEventsService.getTotalClassSubjects();

  dataSource = new MatTableDataSource<ClassSubject>();

  displayedColumns: string[] = ['id', 'title', 'timePerClass', 'totalClasses', 'classesPerWeek', 'difficulty', 'delete/modify'];

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

      this.sortByTitle
      .pipe(
        map((sortByTitle) => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByTitle) {
              return a.title.localeCompare(b.title);
            }
            return 0;
          });
        })
      )
      .subscribe((sortedClassSubjects) => {
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

          this.sortByTitle.next(this.sortByTitle.value);
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
        name: `${classSubject.title}`,
        message: `¿Estás seguro de eliminar el registro de esta asignatura?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === classSubject.id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.sortByTitle.next(this.sortByTitle.value);
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
          this.sortByTitle.next(this.sortByTitle.value);
        }
      }
    });
  }

  toggleSortByName(checked: boolean): void {
    this.sortByTitle.next(checked);
  }

}
