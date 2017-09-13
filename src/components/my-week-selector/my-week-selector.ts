import { Component } from '@angular/core';

/**
 * Generated class for the MyWeekSelectorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'my-week-selector',
  templateUrl: 'my-week-selector.html'
})
export class MyWeekSelectorComponent {

  text: string;

  constructor() {
    console.log('Hello MyWeekSelectorComponent Component');
    this.text = 'Hello World';
  }

}
