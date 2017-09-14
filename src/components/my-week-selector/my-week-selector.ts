import { Component, Output,EventEmitter } from '@angular/core';
import { MyWeekSelectorWeek } from './my-week-selector.model'

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

  public days:MyWeekSelectorWeek[] = [
    {
      name:"日",
      value:0,
      isSelected:true
    },
    {
      name:"一",
      value:1,
      isSelected:true
    },
    {
      name:"二",
      value:2,
      isSelected:true
    },
    {
      name:"三",
      value:3,
      isSelected:true
    },
    {
      name:"四",
      value:4,
      isSelected:true
    },
    {
      name:"五",
      value:5,
      isSelected:true
    },
    {
      name:"六",
      value:6,
      isSelected:true
    }
  ];

  @Output() onWeekChanged = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    this.onWeekChanged.emit(this.getValues());
  }

  onSelected(index:number) {
    this.days[index].isSelected = !this.days[index].isSelected;

    this.onWeekChanged.emit(this.getValues());
  }

  getValues() {
    let arr = new Array<number>();
    this.days.forEach(day=>{
      if(day.isSelected) {
        arr.push(day.value);
      }
    });

    return arr;
  }

}
