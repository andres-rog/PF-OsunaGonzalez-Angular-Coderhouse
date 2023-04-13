import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstNamesPipe } from './firstNames.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { LastNamesPipe } from './lastNames.pipe';



@NgModule({
  declarations: [
    FirstNamesPipe,
    LastNamesPipe,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirstNamesPipe,
    LastNamesPipe,
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
