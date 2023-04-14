import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstNamesPipe } from './firstNames.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { LastNamesPipe } from './lastNames.pipe';
import { PhonePipe } from './phone.pipe';



@NgModule({
  declarations: [
    FirstNamesPipe,
    LastNamesPipe,
    PhonePipe,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirstNamesPipe,
    LastNamesPipe,
    PhonePipe,
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
