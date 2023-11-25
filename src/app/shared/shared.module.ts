import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatSpecialValuesPipe } from './pipes/format-special-values.pipe';
import { FormatValuePipe } from './pipes/format-value.pipe';



@NgModule({
  declarations: [
    FormatSpecialValuesPipe,
    FormatValuePipe
  ],
  exports:[
    FormatSpecialValuesPipe,
    FormatValuePipe
  ],
  imports: [
    CommonModule,
    
  ]
})
export class SharedModule { }
