import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmUsersComponent } from './abm-users/abm-users.component';
import { DeleteUserDialogComponent } from '../dialogs/dialog-components/delete-user-dialog/delete-user-dialog.component';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEventsService } from 'src/app/core/services/user-events-service';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-table',
  templateUrl: './userTable.component.html',
  styleUrls: ['./userTable.component.scss']
})
export class UserTableComponent {

  private sortByNames = new BehaviorSubject<boolean>(false);
  totalUsers$ = this.userEventsService.getTotalUsers();

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'email', 'register_date', 'title', 'role', 'delete/modify'];

  filter(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private notificationService: NotificationsService,
    private userEventsService: UserEventsService,
    public authService: AuthService
    ) {

      this.userEventsService.getUsers().subscribe((user) =>{
        this.dataSource.data = user;
      })

      this.sortByNames
      .pipe(
        map(sortByName => {
          return this.dataSource.data.slice().sort((a, b) => {
            if (sortByName) {
              const aCompleteUserName = `${a.firstName1} ${a.firstName2} ${a.lastName1} ${a.lastName2}`;
              const bCompleteUserName = `${b.firstName1} ${b.firstName2} ${b.lastName1} ${b.lastName2}`;
              return aCompleteUserName.localeCompare(bCompleteUserName);
            }
            return 0;
          });
        })
      )
      .subscribe(sortedUsers => {
        this.dataSource.data = sortedUsers;
      });

      // Initialize totalUsers value
      this.userEventsService.updateTotalUsers(this.dataSource.data.length);
     }


     openABMUser(): void {
      const dialog = this.matDialog.open(AbmUsersComponent, {
        data: {
          action: 'create'
        }
      });

      dialog.componentInstance.userCreated.subscribe(() => {
        this.notificationService.showNotification('USUARIO CREADO EXITOSAMENTE!');
      });

      dialog.afterClosed().subscribe((value) => {
        if (value) {
          const newUser = {
            ...value,
            register_date: new Date(),
            id: this.dataSource.data.length + 1,
          };

          // Update user array and sort again
          this.dataSource.data = [...this.dataSource.data, newUser];

          this.sortByNames.next(this.sortByNames.value);
          this.userEventsService.updateTotalUsers(this.dataSource.data.length);
        }
      });
    }

  deleteUser(user: User) {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(DeleteUserDialogComponent, {
        data: {
          title: 'Eliminar Usuario',
          name: `${user.firstName1} ${user.firstName2} ${user.lastName1} ${user.lastName2}`,
          message: `¿Estás seguro de eliminar el registro de este usuario?`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userEventsService.deleteUser(user.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(s => s.id !== user.id);
            this.sortByNames.next(this.sortByNames.value);
            this.userEventsService.updateTotalUsers(this.dataSource.data.length);
          });
        }
      });
    });
  }

  modifyUser(user: User): void {
    this.authService.isAdmin().subscribe(isAdmin => {
      if (!isAdmin) {
        alert('ERROR: Contacta a un administrador para realizar esta accion');
        return;
      }
      if (!this.authService.isAdmin()) {
        return;
      }
      const dialogRef = this.matDialog.open(AbmUsersComponent, {
        data: {
          action: 'update',
          user: user
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedUser = result;
          this.userEventsService.modifyUser(user.id, updatedUser).subscribe(
            (updatedUser) => {
              const index = this.dataSource.data.findIndex(s => s.id === updatedUser.id);
              if (index > -1) {
                this.dataSource.data[index] = updatedUser;
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
