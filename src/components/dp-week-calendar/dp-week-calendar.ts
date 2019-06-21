import {Component, EventEmitter, Output, Input} from '@angular/core';
import {MyWeekCalendarDay} from "./dp-week-calendar.model";

@Component({
    selector: 'dp-week-calendar',
    templateUrl: 'dp-week-calendar.html'
})
export class MyWeekCalendarComponent {
    public days: Array<MyWeekCalendarDay>;
    public currentDay;

    @Input() weekSource;
    @Output() onDaySelected = new EventEmitter<number>();

    constructor() {
    }

    ngAfterViewInit() {
        this.currentDay = new Date();
        this.createWeek();
    }

    onSelected(day: MyWeekCalendarDay) {
        this.currentDay = new Date(day.date);
        this.onDaySelected.emit(day.date);
    }

    isSelected(day: MyWeekCalendarDay) {
        let selectDay = new Date(day.date);

        if (selectDay.toDateString() == this.currentDay.toDateString()) {
            return true;
        }
        return false;
    }

    private createWeek() {

        this.days = new Array<MyWeekCalendarDay>();

        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let d = new Date(today.setDate(today.getDate() - today.getDay() + i));

            let isToday = false;

            if (d.toDateString() == new Date().toDateString()) {
                isToday = true;
            }

            this.days.push(this.createWeekCalendarDay(d.getTime()));
        }
    }

    private createWeekCalendarDay(date: number): MyWeekCalendarDay {

        let day = new Date(date);
        let today = new Date();

        let isToday = (day.toDateString() == today.toDateString()) ? true : false;

        return {
            date: date,
            isToday: isToday,
            selected: true,
            title: new Date(date).getDate().toString()
        };
    }

}
