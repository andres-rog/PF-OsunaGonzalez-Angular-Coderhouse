import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbmStudentsComponent } from './abm-students.component';
import { StudentEventsService } from 'src/app/core/services/student-events.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ControlErrorMessagesPipe } from 'src/app/shared/pipes/control-error-messages.pipe';
import { of } from 'rxjs';
import { Student } from 'src/app/core/models';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AbmStudentsComponent', () => {
  describe('When "create" action is provided', () => {
    let component: AbmStudentsComponent;
    let fixture: ComponentFixture<AbmStudentsComponent>;
    let studentEventsServiceMock: jasmine.SpyObj<StudentEventsService>;

    beforeEach(async () => {
      studentEventsServiceMock = jasmine.createSpyObj('StudentEventsService', [
        'createStudent',
        'modifyStudent',
        'notifyStudent',
      ]);

      await TestBed.configureTestingModule({
        declarations: [AbmStudentsComponent],
        imports: [
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatButtonModule,
          SharedModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: { close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: StudentEventsService, useValue: studentEventsServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AbmStudentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form with empty fields when created', () => {
      expect(component.studentsForm.value).toEqual({
        id: null,
        register_date: null,
        firstName1: '',
        firstName2: '',
        lastName1: '',
        lastName2: '',
        phone: '',
        email: '',
      });
    });

    it('should call createStudent on save', () => {
      const studentData = {
        id: 1,
        register_date: new Date(),
        firstName1: 'John',
        firstName2: 'Michael',
        lastName1: 'Doe',
        lastName2: 'Smith',
        phone: '1234567890',
        email: 'john.doe@example.com',
      };

      component.studentsForm.setValue(studentData);
      studentEventsServiceMock.createStudent.and.returnValue(of(studentData));
      component.save();

      expect(studentEventsServiceMock.createStudent).toHaveBeenCalled();
    });
  });

  describe('When "update" action is provided', () => {
    let component: AbmStudentsComponent;
    let fixture: ComponentFixture<AbmStudentsComponent>;
    let studentEventsServiceMock: jasmine.SpyObj<StudentEventsService>;

    const studentData = {
      action: 'update',
      student: {
        id: 1,
        register_date: '2023-05-08',
        firstName1: 'John',
        firstName2: 'Michael',
        lastName1: 'Doe',
        lastName2: 'Smith',
        phone: '1234567890',
        email: 'john.doe@example.com',
      },
    };

    beforeEach(async () => {
      studentEventsServiceMock = jasmine.createSpyObj('StudentEventsService', [
        'createStudent',
        'modifyStudent',
        'notifyStudent',
      ]);

      await TestBed.configureTestingModule({
        declarations: [AbmStudentsComponent, ControlErrorMessagesPipe],
        imports: [
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          MatButtonModule,
          SharedModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: { close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: studentData },
          { provide: StudentEventsService, useValue: studentEventsServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AbmStudentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should populate the form with student data', () => {
      expect(component.studentsForm.value).toEqual({
        id: 1,
        register_date: '2023-05-08',
        firstName1: 'John',
        firstName2: 'Michael',
        lastName1: 'Doe',
        lastName2: 'Smith',
        phone: '1234567890',
        email: 'john.doe@example.com',
      });
    });

    it('should call modifyStudent on save', () => {
      const studentWithDate: Student = {
        ...studentData.student,
        register_date: new Date(studentData.student.register_date),
      };

      studentEventsServiceMock.modifyStudent.and.returnValue(
        of(studentWithDate)
      );
      component.save();

      expect(studentEventsServiceMock.modifyStudent).toHaveBeenCalled();
    });
  });

  describe('numberOnly method', () => {
    let component: AbmStudentsComponent;
    let fixture: ComponentFixture<AbmStudentsComponent>;
    let studentEventsServiceMock: jasmine.SpyObj<StudentEventsService>;

    beforeEach(async () => {
      studentEventsServiceMock = jasmine.createSpyObj('StudentEventsService', [
        'createStudent',
        'modifyStudent',
        'notifyStudent',
      ]);

      await TestBed.configureTestingModule({
        declarations: [AbmStudentsComponent],
        imports: [
          ReactiveFormsModule,
          MatFormFieldModule,
          SharedModule,
          MatInputModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: { close: () => {} } },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: StudentEventsService, useValue: studentEventsServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AbmStudentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should return true if the event contains a number', () => {
      const event = { which: 50 }; // ASCII code for '2'
      expect(component.numberOnly(event)).toBeTruthy();
    });

    it('should return false if the event does not contain a number', () => {
      const event = { which: 65 }; // ASCII code for 'A'
      expect(component.numberOnly(event)).toBeFalsy();
    });
  });
});
