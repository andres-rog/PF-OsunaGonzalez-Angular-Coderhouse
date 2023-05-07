import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { DeleteStudentDialogComponent } from '../dialogs/dialog-components/delete-student-dialog/delete-student-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentEventsService } from 'src/app/core/services/student-events.service';
import { Student } from 'src/app/core/models';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-table',
  templateUrl: './studentTable.component.html',
  styleUrls: ['./studentTable.component.scss']
})
export class StudentTableComponent {

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
    private studentEventsService: StudentEventsService,
    public authService: AuthService
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
      console.log('Local Storage:', window.localStorage);
      const dialog = this.matDialog.open(AbmStudentsComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.componentInstance.studentCreated.subscribe(() => {
        this.notificationService.showNotification('ESTUDIANTE CREADO EXITOSAMENTE!');
      });

      dialog.afterClosed().subscribe((value) => {
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

  deleteStudent(student: Student) {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(DeleteStudentDialogComponent, {
        data: {
          title: 'Eliminar Alumno',
          name: `${student.firstName1} ${student.firstName2} ${student.lastName1} ${student.lastName2}`,
          message: `¿Estás seguro de eliminar el registro de este alumno?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.studentEventsService.deleteStudent(student.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(s => s.id !== student.id);
            this.sortByNames.next(this.sortByNames.value);
            this.studentEventsService.updateTotalStudents(this.dataSource.data.length);
          });
        }
      });
    });
  }

  modifyStudent(student: Student): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(AbmStudentsComponent, {
        data: {
          action: 'update',
          student: student
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedStudent = result;
          this.studentEventsService.modifyStudent(student.id, updatedStudent).subscribe(
            (updatedStudent) => {
              const index = this.dataSource.data.findIndex(s => s.id === updatedStudent.id);
              if (index > -1) {
                this.dataSource.data[index] = updatedStudent;
                this.dataSource._updateChangeSubscription();
                this.sortByNames.next(this.sortByNames.value);
              }
            },
            (error) => {
              console.error('Error:', error);
              this.notificationService.showNotification('ERROR');
            }
          );
        }
      });
    });
  }

  toggleSortByName(checked: boolean): void {
    this.sortByNames.next(checked);
  }

}
