import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initDate'
})
export class InitDatePipe implements PipeTransform {
  transform(value: string): any {
    let date = new Date(value);
    return date;
  }
}