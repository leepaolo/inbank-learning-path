import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'longDate'): string {
    // Usa la funzione formatDate di Angular per formattare la data
    return formatDate(value, format, 'en-US');
  }
}
