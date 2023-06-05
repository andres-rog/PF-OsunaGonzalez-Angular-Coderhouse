import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEventsService } from 'src/app/core/services/user-events-service';
import { EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-abm-users',
  templateUrl: './abm-users.component.html',
  styleUrls: ['./abm-users.component.scss']
})
export class AbmUsersComponent {

  userCreated = new EventEmitter<void>();
  userUpdated = new EventEmitter<User>();

  idControl = new FormControl();
  register_dateControl = new FormControl();
  firstName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  firstName2Control = new FormControl('',[Validators.maxLength(30)]);
  lastName1Control = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  lastName2Control = new FormControl('', [Validators.maxLength(30)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  titleControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  roleControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  tokenControl = new FormControl('', [Validators.maxLength(50)]);

  usersForm = new FormGroup({
    id: this.idControl,
    register_date: this.register_dateControl,
    firstName1: this.firstName1Control,
    firstName2: this.firstName2Control,
    lastName1: this.lastName1Control,
    lastName2: this.lastName2Control,
    title: this.titleControl,
    role: this.roleControl,
    email: this.emailControl,
    token: this.tokenControl
  });

  constructor(
    private dialogRef: MatDialogRef<AbmUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userEventsService: UserEventsService
  ) {
    if (data.action === 'update') {
      this.setUserData(data.user);
    }
  }

  setUserData(user: any) {
    this.idControl.setValue(user.id);
    this.register_dateControl.setValue(user.register_date);
    this.firstName1Control.setValue(user.firstName1);
    this.firstName2Control.setValue(user.firstName2);
    this.lastName1Control.setValue(user.lastName1);
    this.lastName2Control.setValue(user.lastName2);
    this.emailControl.setValue(user.email);
    this.titleControl.setValue(user.title);
    this.roleControl.setValue(user.role);
    this.tokenControl.setValue(user.token);
  }

  save(): void {
    if (this.usersForm.valid) {
      const user: User = {
        id: this.idControl.value,
        register_date: this.register_dateControl.value,
        firstName1: this.firstName1Control.value as string,
        firstName2: this.firstName2Control.value as string,
        lastName1: this.lastName1Control.value as string,
        lastName2: this.lastName2Control.value as string,
        email: this.emailControl.value as string,
        token: this.tokenControl.value as string,
        role: this.roleControl.value as string,
        title: this.titleControl.value as string
      };

      if (this.data.action === 'update') {
        this.userEventsService.modifyUser(user.id, user).pipe(
          catchError((error) => {
            //console.error('Error', error);
            this.userEventsService.notifyUser('ERROR');
            return of(null);
          })
        ).subscribe((updatedUser) => {
          if (updatedUser) {
            this.dialogRef.close(updatedUser);
            this.userEventsService.notifyUser('USUARIO ACTUALIZADO CON EXITO...');
          }
        });
      } else {
        this.userEventsService.createUser(user).pipe(
          catchError((error) => {
            //console.error('Error', error);
            this.userEventsService.notifyUser('ERROR');
            return of(null);
          })
        ).subscribe((createdUser) => {
          if (createdUser) {
            this.dialogRef.close(createdUser);
            this.userEventsService.notifyUser('USUARIO CREADO CON EXITO...');
          }
        });
      }
    } else {
      this.usersForm.markAllAsTouched();
    }
  }
}
