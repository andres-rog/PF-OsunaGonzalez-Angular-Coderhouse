import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmStudentsComponent } from './abm-students/abm-students.component';

export interface Student {
  id: number;
  name1: string;
  name2: string;
  lastName1: string;
  lastName2: string;
  phone: string;
  email: string;
  registrer_date: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  estudiantes: Student[] = [
    {
      id: 1,
      name1: 'Andres',
      name2: 'Roberto',
      lastName1: 'Osuna',
      lastName2: 'Gonzalez',
      phone: '555-555-5555',
      email: 'Andres.ROG@outlook.com',
      registrer_date: new Date()
    },
    {
      id: 2,
      name1: 'Test1',
      name2: 'Test2',
      lastName1: 'Test3',
      lastName2: 'Test4',
      phone: '123-456-7890',
      email: 'TEST@outlook.com',
      registrer_date: new Date()
    }
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'firstNames', 'lastNames', 'phone', 'email', 'registrer_date', 'delete/modify'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog) {}


  openABMStudent(): void {
    const dialog = this.matDialog.open(AbmStudentsComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...valor,
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }
}
