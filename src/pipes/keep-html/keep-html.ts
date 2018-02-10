import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeepHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'keepHtmlPipe',
})
export class KeepHtmlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
