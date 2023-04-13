import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
