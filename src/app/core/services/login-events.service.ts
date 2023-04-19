import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginEventService {
  login$: Subject<string> = new Subject();

  constructor() { }

  notifyLogin(message: string): void {
    this.login$.next(message);
  }
}
