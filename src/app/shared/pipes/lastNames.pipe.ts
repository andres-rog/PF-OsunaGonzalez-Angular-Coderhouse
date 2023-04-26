import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/pages/students/studentTable.component';

@Pipe({
  name: 'lastNames'
})
export class LastNamesPipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    const newValue = `${value.lastName1} ${value.lastName2}`;
    switch (args[0]) {
      case 'uppercase':
        return newValue.toUpperCase();
      case 'lowercase':
        return newValue.toLowerCase();
      default:
        return newValue;
    }
  }

}
