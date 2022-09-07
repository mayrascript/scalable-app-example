import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber',
})
export class StringToNumberPipe implements PipeTransform {
  transform(value: string): number {
    return Number(value);
  }
}
