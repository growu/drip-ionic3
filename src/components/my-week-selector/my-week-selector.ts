import {Component, Output, EventEmitter, Input} from '@angular/core';
import {MyWeekSelectorWeek} from './my-week-selector.model'

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

    public days: MyWeekSelectorWeek[] = [
        {
            name: "一",
            value: 1,
            isSelected: true
        },
        {
            name: "二",
            value: 2,
            isSelected: true
        },
        {
            name: "三",
            value: 3,
            isSelected: true
        },
        {
            name: "四",
            value: 4,
            isSelected: true
        },
        {
            name: "五",
            value: 5,
            isSelected: true
        },
        {
            name: "六",
            value: 6,
            isSelected: true
        },
        {
            name: "日",
            value: 0,
            isSelected: true
        }
    ];

    @Input() _weeks: Array<number> = [];
    @Input() color: string;

    @Output() onWeekChanged = new EventEmitter();

    constructor() {
        console.log(this.days);
    }

    @Input()
    set weeks(value: any) {
        this._weeks = value;
        if (this._weeks.length > 0) {
            this.days.forEach((day, index) => {
                if (this._weeks.indexOf(day.value) >= 0) {
                    this.days[index].isSelected = true;
                } else {
                    this.days[index].isSelected = false;
                }
            });
        }
    }

    ngAfterViewInit() {
        this.onWeekChanged.emit(this.getValues());
    }

    getColor(day) {
        console.log(day);
        if(day.isSelected) {
            return this.color;
        } else {
            return '#dedede';
        }
    }

    onSelected(index: number) {
        let arr = this.getValues();
        if (arr.length == 1 && arr[0] == index) return;
        this.days[index].isSelected = !this.days[index].isSelected;
        this.onWeekChanged.emit(this.getValues());
    }

    getValues() {
        let arr = new Array<number>();
        this.days.forEach(day => {
            if (day.isSelected) {
                arr.push(day.value);
            }
        });

        return arr;
    }

}
