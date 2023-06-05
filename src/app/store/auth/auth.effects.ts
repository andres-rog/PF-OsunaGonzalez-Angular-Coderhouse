import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from 'src/environments/environments';
import { User } from 'src/app/core/models';
import { LoginUser, LoginUserSuccess, LoginUserFailure, LogoutUser, LogoutUserSuccess, ClearAuthUser, FindUserByToken, SetUserByToken, FindUserByTokenFailure, VerifyToken, VerifyTokenFailure, VerifyTokenSuccess } from './auth.actions';
import { LoginFormValue } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(LoginUser),
    mergeMap(({ payload }) => {
        let params = new HttpParams();
        Object.keys(payload).forEach(key => {
          params = params.set(key, payload[key as keyof LoginFormValue]);
        });

        return this.http.get<User[]>(`${enviroment.apiBaseUrl}/user`, { params })
        .pipe(
          map(users => {
            const user = users[0];                                   
            if (user) { //Encontro user. Guardar en localStorage e ir a Dashboard
              localStorage.setItem('token', user.token);
              this.router.navigate(['dashboard']); 
              return LoginUserSuccess({ payload: user });
            } else {
              alert('¡User y contraseña incorrectos!'); //No encontro, mostrar error.
              return LoginUserFailure({ error: 'User and password are incorrect' });
            }
          }),
          catchError((error) => {
            alert('Error al iniciar sesión' + error); //Error inesperado aqui.
            return EMPTY;
          })
        )
    })
  ));

  logoutUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LogoutUser),
    mergeMap(() => { //Limpiar localstorare, ir a login page.
      localStorage.removeItem('token');
      this.router.navigate(['auth']);
      return [
        LogoutUserSuccess(),
        ClearAuthUser()
      ];
    })
  )
);

findUserByToken$ = createEffect(() => this.actions$.pipe(
    ofType(FindUserByToken),
    mergeMap((action) => 
      this.http.get<User[]>(`${enviroment.apiBaseUrl}/user?token=${action.token}`, {
      }).pipe(
        map(users => {
          const user = users[0];
          if (user) {
            return SetUserByToken({ user });
          } else {
            return FindUserByTokenFailure({ error: 'No user found with the provided token' });
          }
        }),
        catchError((error) => of(FindUserByTokenFailure({ error })))
      )
    )
  ));

  verifyToken$ = createEffect(() => this.actions$.pipe(
    ofType(VerifyToken),
    mergeMap((action) =>
      this.http.get<User[]>(`${enviroment.apiBaseUrl}/user?token=${action.token}`, {
      }).pipe(
        map(users => { //Se encontro user, guardarlo
          const user = users[0];
          if (user) {
            return VerifyTokenSuccess({ user });
          } else { //No se encontro
            return VerifyTokenFailure({ error: 'No user found with the provided token' });
          }
        }),
        catchError((error) => of(VerifyTokenFailure({ error })))
      )
    )
  ));

}