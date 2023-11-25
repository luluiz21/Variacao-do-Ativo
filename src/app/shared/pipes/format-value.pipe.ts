import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatValue' })
export class FormatValuePipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === 0 || value === null) {
      return 'Sem informação'; // ou "-" dependendo da sua preferência
    } else {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
  }
}