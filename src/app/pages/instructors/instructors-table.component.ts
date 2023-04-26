import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmInstructorsComponent } from './abm-instructors/abm-instructors.component';
//import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { InstructorEventsService } from '../../core/services/instructor-events-service';
import { DeleteInstructorDialogComponent } from '../dialogs/dialog-components/delete-instructor-dialog/delete-instructor-dialog.component';

export interface Instructor {
  id: number;
  firstName1: string;
  firstName2: string;
  lastName1: string;
  lastName2: string;
  phone: string;
  email: string;
  register_date: Date;
  expertise: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './instructors-Table.component.html',
  styleUrls: ['./instructors-Table.component.scss']
})
export class InstructorTableComponent {

  private sortByNames = new BehaviorSubject<boolean>(false);
  totalInstructors$ = this.instructorEventsService.getTotalInstructors();

  dataSource = new MatTableDataSource<Instructor>();

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'phone', 'email', 'register_date', 'expertise', 'delete/modify'];
  notificationService: any;

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    //private notificationService: NotificationsService,
    private instructorEventsService: InstructorEventsService
    ) {

      this.instructorEventsService.getInstructors().subscribe((instructor) =>{
        this.dataSource.data = instructor;
      })

      this.sortByNames
      .pipe(
        map(sortByName => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByName) {
              const aCompleteInstructorName = `${a.firstName1} ${a.firstName2} ${a.lastName1} ${a.lastName2}`;
              const bCompleteInstructorName = `${b.firstName1} ${b.firstName2} ${b.lastName1} ${b.lastName2}`;
              return aCompleteInstructorName.localeCompare(bCompleteInstructorName);
            }
            return 0;
          });
        })
      )
      .subscribe(sortedInstructors => {
        this.dataSource.data = sortedInstructors;
      });

      // Initialize totalInstructors value
      this.instructorEventsService.updateTotalInstructors(this.dataSource.data.length);
     }


     openABMInstructor(): void {
      const dialog = this.matDialog.open(AbmInstructorsComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.componentInstance.InstructorCreated.subscribe(() => {
        this.notificationService.showNotification('Instructor created successfully');
      });

      dialog.afterClosed().subscribe((value) => {
        console.log(value);
        if (value) {
          const newInstructor = {
            ...value,
            register_date: new Date(),
            id: this.dataSource.data.length + 1,
          };

          // Update instructor array and sort again
          this.dataSource.data = [...this.dataSource.data, newInstructor];

          this.sortByNames.next(this.sortByNames.value);
          this.instructorEventsService.updateTotalInstructors(this.dataSource.data.length);
        }
      });
    }

  logInstructor(instructor: any) {
    console.log(instructor);
  }

  deleteInstructor(instructor: any) {
    const dialogRef = this.matDialog.open(DeleteInstructorDialogComponent, {
      data: {
        title: 'Eliminar',
        name: `${instructor.firstName1} ${instructor.firstName2} ${instructor.lastName1} ${instructor.lastName2}`,
        message: `¿Estás seguro de eliminar el registro de este instructor?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(s => s.id === instructor.id);
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.sortByNames.next(this.sortByNames.value);
          this.instructorEventsService.updateTotalInstructors(this.dataSource.data.length);
        }
      }
    });
  }

  modifyInstructor(instructor: any) {
    const dialogRef = this.matDialog.open(AbmInstructorsComponent, {
      data: {
        action: 'update',
        Instructor: instructor
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

          // Update instructor array and sort again
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
