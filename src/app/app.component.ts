import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '1PF-AndresOsuna';

  constructor(private authService: AuthService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.findUserByToken(token);
    }
  }

}
