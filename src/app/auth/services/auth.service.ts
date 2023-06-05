import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { User } from 'src/app/core/models';
import { AppState } from 'src/app/store';
import { FindUserByToken, LoginUser, LogoutUser, SetLoggedUser } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { enviroment } from 'src/environments/environments';
import { ClearAuthUser } from '../../store/auth/auth.actions';
export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  getLogedUser(): Observable<User | null> {
    //return this.authUser$.asObservable();
    return this.store.select(selectAuthUser);
  }

  setLoggedUser(user: User): void {
    this.store.dispatch(SetLoggedUser({ payload: user }));
  }

  login(formValue: LoginFormValue): void {
    this.store.dispatch(LoginUser({ payload: formValue }));
  }

  logout(): void {
    this.store.dispatch(LogoutUser());
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
            this.setLoggedUser(logedUser);
            //this.authUser$.next(logedUser);
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
    this.store.dispatch(FindUserByToken({ token }));
  }

}
