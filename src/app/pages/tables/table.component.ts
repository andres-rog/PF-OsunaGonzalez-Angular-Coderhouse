import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { DeleteStudentDialogComponent } from '../dialogs/dialog-components/delete-student-dialog/delete-student-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentEventsService } from 'src/app/core/services/student-events.service';

export interface Student {
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
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  private sortByNames = new BehaviorSubject<boolean>(false);
  totalStudents$ = this.studentEventsService.getTotalStudents();

  dataSource = new MatTableDataSource<Student>();

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'phone', 'email', 'register_date', 'delete/modify'];

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationsService,
    private studentEventsService: StudentEventsService
    ) {

      this.studentEventsService.getStudents().subscribe((student) =>{
        this.dataSource.data = student;
      })

      this.sortByNames
      .pipe(
        map(sortByName => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByName) {
              const aCompleteStudentName = `${a.firstName1} ${a.firstName2} ${a.lastName1} ${a.lastName2}`;
              const bCompleteStudentName = `${b.firstName1} ${b.firstName2} ${b.lastName1} ${b.lastName2}`;
              return aCompleteStudentName.localeCompare(bCompleteStudentName);
            }
            return 0;
          });
        })
      )
      .subscribe(sortedStudents => {
        this.dataSource.data = sortedStudents;
      });

      // Initialize totalStudents value
      this.studentEventsService.updateTotalStudents(this.dataSource.data.length);
     }


     openABMStudent(): void {
      const dialog = this.matDialog.open(AbmStudentsComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.componentInstance.studentCreated.subscribe(() => {
        this.notificationService.showNotification('Student created successfully');
      });

      dialog.afterClosed().subscribe((value) => {
        console.log(value);
        if (value) {
          const newStudent = {
            ...value,
            register_date: new Date(),
            id: this.dataSource.data.length + 1,
          };

          // Update student array and sort again
          this.dataSource.data = [...this.dataSource.data, newStudent];

          this.sortByNames.next(this.sortByNames.value);
          this.studentEventsService.updateTotalStudents(this.dataSource.data.length);
        }
      });
    }

  logStudent(student: any) {
    console.log(student);
  }

  deleteStudent(student: any) {
    const dialogRef = this.matDialog.open(DeleteStudentDialogComponent, {
      data: {
        title: 'Eliminar',
        name: `${student.firstName1} ${student.firstName2} ${student.lastName1} ${student.lastName2}`,
        message: `¿Estás seguro de eliminar el registro de este alumno?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === student.id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.sortByNames.next(this.sortByNames.value);
          this.studentEventsService.updateTotalStudents(this.dataSource.data.length);
        }
      }
    });
  }

  modifyStudent(student: any) {
    const dialogRef = this.matDialog.open(AbmStudentsComponent, {
      data: {
        action: 'update',
        student: student
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

          // Update student array and sort again
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
