import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/core/models';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    const formatedPhone = value.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return formatedPhone;
  }
}
