import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { User } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';
export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getLogedUser(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/user`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (user) => {
        const logedUser = user[0];
        if (logedUser) {
          localStorage.setItem('token', logedUser.token)
          this.authUser$.next(logedUser);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡User y contraseña incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/user?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((user) => {
          const logedUser = user[0];
          if (logedUser) {
            localStorage.setItem('token', logedUser.token)
            this.authUser$.next(logedUser);
          }
          return !!logedUser;
        }),
        catchError((err) => {
          alert('Error al verificar el token');
          return throwError(() => err);
        })
      );
  }

  isAdmin(): Observable<boolean> {
    return this.getLogedUser().pipe(
      map((user) => user?.role === 'admin')
    );
  }

  findUserByToken(token: string): void {
    this.httpClient.get<User[]>(
      `${enviroment.apiBaseUrl}/user?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    ).subscribe({
      next: (users) => {
        const foundUser = users[0];
        if (foundUser) {
          this.authUser$.next(foundUser);
        }
      },
      error: (err) => {
        console.error('Error finding user by token:', err);
      }
    });
  }

}
