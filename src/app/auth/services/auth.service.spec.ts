import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, LoginFormValue } from './auth.service';
import { User } from 'src/app/core/models';
import { enviroment } from 'src/environments/environments';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', redirectTo: '' },
          { path: 'auth', redirectTo: '' },
        ]),
      ],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', () => {
    const dummyLoginFormValue: LoginFormValue = {
      email: 'test@example.com',
      password: 'test_password',
    };

    const dummyUser: User = {
      id: 1,
      firstName1: 'Test1',
      firstName2: 'Test2',
      lastName1: 'Test3',
      lastName2: 'Test4',
      title: 'Tutor',
      role: 'admin',
      email: 'test@test.com',
      token: 'asdasdasd',
      register_date: new Date(),
    };

    service.login(dummyLoginFormValue);

    const request = httpMock.expectOne(
      (req) =>
        req.url === `${enviroment.apiBaseUrl}/user` &&
        req.params.get('email') === dummyLoginFormValue.email &&
        req.params.get('password') === dummyLoginFormValue.password
    );

    expect(request.request.method).toBe('GET');

    request.flush([dummyUser]);
  });

  it('should log out a user', () => {
    spyOn(service['router'], 'navigate');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service['authUser$'].value).toBeNull();
    expect(service['router'].navigate).toHaveBeenCalledWith(['auth']);
  });
});
