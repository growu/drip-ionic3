import {Component, Input, ViewChild, Output,EventEmitter} from '@angular/core';
import { Slides } from 'ionic-angular';
import {MyCalendarMode, MyCalendarDays, MyCalendarDay} from './my-calendar.model'
import { MyCalendarService } from './my-calendar.service';

@Component({
    selector: 'my-calendar',
    templateUrl: 'my-calendar.html',
    providers:[MyCalendarService]
})


export class MyCalendarComponent {

    _weekArray:string[] = ['日','一','二','三','四','五','六'];
    _dayArray:MyCalendarDays;
    _weekStart: number = 0;

    public currentViewIndex = 0;
    public mode:MyCalendarMode = 'week';
    public currentYear;
    public currentMonth;
    public currentWeek;
    public currentDay;



    @ViewChild('weekSlides') slides:Slides;

    @Input()  color: string = 'primary';
    @Output() onTitleChanged = new EventEmitter<string>();
    @Output() onDaySelected = new EventEmitter<number>();


    constructor(public myCalendarService:MyCalendarService) {
        this.currentDay = new Date();

        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth()+1;
        console.log(this.currentMonth);
        this.currentWeek = this.myCalendarService.getWeekNumber(new Date())[1];

        this.refreshView('');
    }

    ngAfterViewInit() {
        this.onTitleChanged.emit(this._dayArray.original.title);
    }



    // @Input()
    // set weekArray(value: string[]) {
    //     if (value && value.length === 7) {
    //         this._weekArray = value;
    //         this.adjustSort();
    //     }
    // }
    //
    // @Input()
    // set weekStart(value: number) {
    //     if (value === 0 || value === 1) {
    //         this._weekStart = value;
    //         this.adjustSort();
    //     }
    // }
    //
    // adjustSort() {
    //     if (this._weekStart === 1) {
    //         this._weekArray.push(this._weekArray.shift())
    //     }
    // }

    onSelected(day:MyCalendarDay) {
        this.currentDay = new Date(day.date);
        console.log( this.currentDay);
        this.currentYear = this.currentDay.getFullYear();
        this.currentMonth =  this.currentDay.getMonth()+1;
        this.currentWeek =  this.myCalendarService.getWeekNumber(this.currentDay)[1];

        this.onDaySelected.emit(day.date);
    }

    isSelected(day:MyCalendarDay) {
        let selectDay = new Date(day.date);
        if (selectDay.toDateString() == this.currentDay.toDateString()) {
            return true ;
        }

        return false;
    }

    refreshView(direction:string){
        let value = this.mode == 'week'?this.currentWeek:this.currentMonth;

        this._dayArray = this.myCalendarService.createCalendarDays(this.currentYear,value,this.currentDay.getTime(),this.mode,direction);

        console.log(this._dayArray);

        this.currentYear = this._dayArray.original.year;
        this.currentMonth = this._dayArray.original.month;
        this.currentWeek = this._dayArray.original.week;

        this.onTitleChanged.emit(this._dayArray.original.title);
    }

    swipeEvent($event) {

        if($event.direction == 8) {
            this.mode = 'week';
            this.refreshView('');
        } else if($event.direction == 16) {
            this.mode = 'month';
            this.refreshView('');
        } else if($event.direction == 2) {
            this.refreshView('next');
        } else if($event.direction == 4) {
            this.refreshView('prev');
        }


    }

}