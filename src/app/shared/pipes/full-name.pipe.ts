import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/pages/tables/table.component';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    const newValue = `${value.name} ${value.apellido}`;
    switch (args[0]) {
      case 'mayuscula':
        return newValue.toUpperCase();
      case 'minuscula':
        return newValue.toLowerCase();
      default:
        return newValue;
    }
  }

}
