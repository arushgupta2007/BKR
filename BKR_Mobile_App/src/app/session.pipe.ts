import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'session'
})
export class SessionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
