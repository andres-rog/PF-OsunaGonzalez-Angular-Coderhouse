import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  username = '';
  password = '';
  loading = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onLoginClick(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      // La logica del login carga aqui
      setTimeout(() => {
        this.loading = false;
        this.dialogRef.close();
      }, 2000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
