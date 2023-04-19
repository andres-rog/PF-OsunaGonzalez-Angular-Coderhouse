import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { DeleteStudentDialogComponent } from '../dialogs/dialog-components/delete-student-dialog/delete-student-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

  student: Student[] = [
    {
      id: 1,
      firstName1: 'Andres',
      firstName2: 'Roberto',
      lastName1: 'Osuna',
      lastName2: 'Gonzalez',
      phone: '5555555555',
      email: 'Andres.ROG@outlook.com',
      register_date: new Date()
    },
    {
      id: 2,
      firstName1: 'Test1',
      firstName2: 'Test2',
      lastName1: 'Test3',
      lastName2: 'Test4',
      phone: '1234567890',
      email: 'TEST@outlook.com',
      register_date: new Date()
    }
  ];

  dataSource = new MatTableDataSource(this.student);

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'phone', 'email', 'register_date', 'delete/modify'];

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationsService
    ) {

      this.sortByNames
      .pipe(
        map(sortByName => {
          return this.student.slice().sort((a, b) => {
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
        if (value) {
          const newStudent = {
            ...value,
            register_date: new Date(),
            id: this.dataSource.data.length + 1,
          };

          // Update student array and sort again
          this.student.push(newStudent);
          this.sortByNames.next(this.sortByNames.value);
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
          this.dataSource._updateChangeSubscription();

          // Update student array and sort again
          this.student.splice(index, 1);
          this.sortByNames.next(this.sortByNames.value);
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
        if (index > -1) {
          console.log(result);
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription();

          // Update student array and sort again
          this.student[index] = result;
          this.sortByNames.next(this.sortByNames.value);
        }
      }
    });
  }

  toggleSortByName(checked: boolean): void {
    this.sortByNames.next(checked);
  }

}
