import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/core/models';

@Pipe({
  name: 'firstNames'
})
export class FirstNamesPipe implements PipeTransform {

  transform(value: User, ...args: unknown[]): unknown {
    const newValue = `${value.firstName1} ${value.firstName2}`;
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
