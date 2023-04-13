import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/pages/tables/table.component';

@Pipe({
  name: 'firstNames'
})
export class FirstNamesPipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    const newValue = `${value.name1} ${value.name2}`;
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
