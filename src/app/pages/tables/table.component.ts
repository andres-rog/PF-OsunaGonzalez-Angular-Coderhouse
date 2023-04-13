import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmStudentsComponent } from './abm-students/abm-students.component';

export interface Student {
  id: number;
  name: string;
  apellido: string;
  fecha_registro: Date;
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
      name: 'Andres',
      apellido: 'Osuna',
      fecha_registro: new Date()
    },
    {
      id: 2,
      name: 'Roberto',
      apellido: 'Gonzalez',
      fecha_registro: new Date()
    }
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'fullName', 'fecha_registro'];

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
