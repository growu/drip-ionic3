import {Component, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {Slides} from 'ionic-angular';
import {DpCalendarMode, DpCalendarDays, DpCalendarDay} from './dp-calendar.model'
import {DpCalendarService} from './dp-calendar.service';

@Component({
    selector: 'dp-calendar',
    templateUrl: 'dp-calendar.html',
    providers: [DpCalendarService]
})


export class DpCalendarComponent {

    _weekArray: string[] = ['日', '一', '二', '三', '四', '五', '六'];
    _dayArray: DpCalendarDays;
    _weekStart: number = 0;

    public currentViewIndex = 0;
    // public currentMode:DpCalendarMode = 'week';
    public currentYear;
    public currentMonth;
    public currentWeek;
    public currentDay;

    @ViewChild('weekSlides') slides: Slides;

    @Input() color: string = 'primary';
    @Input() _mode: DpCalendarMode = 'week';

    @Output() onTitleChanged = new EventEmitter<string>();
    @Output() onDaySelected = new EventEmitter<number>();


    constructor(public DpCalendarService: DpCalendarService) {
        this.currentDay = new Date();
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.currentWeek = this.DpCalendarService.getWeekNumber(new Date())[1];

        this.refreshView('');
    }

    ngAfterViewInit() {
        if (this._dayArray) {
            this.onTitleChanged.emit(this._dayArray.original.title);
        } else {
            this.onTitleChanged.emit("今天");
        }
    }


    @Input()
    set mode(value: any) {
        this._mode = value;
        this.refreshView('');
    }

    onSelected(day: DpCalendarDay) {
        this.currentDay = new Date(day.date);
        this.currentYear = this.currentDay.getFullYear();
        this.currentMonth = this.currentDay.getMonth() + 1;
        this.currentWeek = this.DpCalendarService.getWeekNumber(this.currentDay)[1];
        this.onDaySelected.emit(day.date);
    }

    isSelected(day: DpCalendarDay) {
        let selectDay = new Date(day.date);
        if (selectDay.toDateString() == this.currentDay.toDateString()) {
            return true;
        }
        return false;
    }

    refreshView(direction: string) {
        let value = this._mode == 'week' ? this.currentWeek : this.currentMonth;

        this.DpCalendarService.createCalendarDays(this.currentYear, value, this.currentDay.getTime(), this._mode, direction).then((data) => {
            console.log(data);
            this._dayArray = data;
            if (this._dayArray) {
                this.currentYear = this._dayArray.original.year;
                this.currentMonth = this._dayArray.original.month;
                this.currentWeek = this._dayArray.original.week;
                this.onTitleChanged.emit(this._dayArray.original.title);
            } else {
                this.onTitleChanged.emit("今天");
                this.onDaySelected.emit(new Date().getTime());
            }
        });
    }

    swipeEvent($event) {

        if ($event.direction == 8) {
            this._mode = 'week';
            this.refreshView('');
        } else if ($event.direction == 16) {
            this._mode = 'month';
            this.refreshView('');
        } else if ($event.direction == 2) {
            this.refreshView('next');
        } else if ($event.direction == 4) {
            this.refreshView('prev');
        }


    }

}