import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatSpecialValues' })
export class FormatSpecialValuesPipe implements PipeTransform {
  transform(value: number): string {
    if (value === Infinity || value === -Infinity || value === 0 || value === -100) {
      return '-'; 
    } else {
      return value.toFixed(2) + '%';
    }
  }
}