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
        this.notificationService.showNotification('ASIGNATURA CREADA CORRECTAMENTE!');
      });

      dialog.afterClosed().subscribe((value) => {
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

  deleteClassSubject(classSubject: any) {
    const dialogRef = this.matDialog.open(DeleteClassSubjectDialogComponent, {
      data: {
        title: 'Eliminar Asignatura',
        name: `${classSubject.title}`,
        message: `¿Estás seguro de eliminar el registro de esta asignatura?`
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.classSubjectEventsService.deleteClassSubject(classSubject.id).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(s => s.id !== classSubject.id);
            this.classSubjectEventsService.updateTotalClassSubjects(this.dataSource.data.length);
            this.notificationService.showNotification('ASIGNATURA ELIMINADA CORRECTAMENTE!');
          },
          (error) => {
            console.error('Error:', error);
            this.notificationService.showNotification('ERROR');
          }
        );
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
        this.classSubjectEventsService.modifyClassSubject(result.id, result).subscribe(
          (updatedClassSubject) => {
            const index = this.dataSource.data.findIndex(s => s.id === updatedClassSubject.id);
            if (index > -1) {
              this.dataSource.data[index] = updatedClassSubject;
              this.dataSource._updateChangeSubscription();

              // Update classSubject array and sort again
              this.sortByTitle.next(this.sortByTitle.value);
              this.notificationService.showNotification('Asignatura modificada correctamente!');
            }
          },
          (error) => {
            this.notificationService.showNotification('Error al modificar la asignatura!');
          }
        );
      }
    });
  }

  toggleSortByName(checked: boolean): void {
    this.sortByTitle.next(checked);
  }

}
