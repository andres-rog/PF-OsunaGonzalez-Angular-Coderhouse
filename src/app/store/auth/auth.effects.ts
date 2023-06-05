import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService, LoginFormValue } from '../services/auth.service';
import { login, SetLoggedUser, LoginFailure } from './auth.actions';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action: {payload: LoginFormValue}) =>
        this.authService.login(action.payload).pipe(
          map(user => ({user, validUser: !!user})),
          filter(({validUser}) => validUser),
          map(({user}) => {
            localStorage.setItem('token', user!.token);
            this.router.navigate(['dashboard']);
            return SetLoggedUser({ payload: user! });
          }),
          catchError(error => of(LoginFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}