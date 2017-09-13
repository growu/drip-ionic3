/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/12
 * @version 1.0
 */
import { Injectable } from '@angular/core';
import {MyCalendarMode, MyCalendarDay, MyCalendarDays,MyCalendarOriginal} from './my-calendar.model';

@Injectable()

export class MyCalendarService {

    constructor() {

    }

    createCalendarDays(year:number,value:number,day:number,mode:MyCalendarMode,direction:string): MyCalendarDays {
    
        if(mode == 'week') {
            // 取出当年的周数
            let weeks = this.getWeeksInYear(year);
                if(direction == 'next') { // 向右滑动
                    if(value == weeks) {
                        year += 1;
                        value = 1;
                    } else {
                        value += 1;
                    }
                } else if (direction == 'prev') { // 向左滑动
                    if(value == 1) { // 第一月
                        year = year - 1;
                        value = this.getWeeksInYear(year);
                    } else {
                        value -= 1;
                    }
                }

            return this.createCalendarWeek(year,value);
        } else if(mode == 'month') {

            if(direction == 'next') { // 向右滑动
                if(value == 12) {
                    year += 1;
                    value = 1;
                } else {
                    value += 1;
                }
            } else if (direction == 'prev') { // 向左滑动
                if(value == 1) { // 第一月
                    year = year - 1;
                    value = 12;
                } else {
                    value -= 1;
                }
            }

            return  this.createCalendarMonth(year,value,day);
        }
    }

     getWeeksInYear(year) {
        var month = 11, day = 31, week;
        var d;
        // Find week that 31 Dec is in. If is first week, reduce date until
        // get previous week.
        do {
            d = new Date(year, month, day--);
            week = this.getWeekNumber(d)[1];
        } while (week == 1);

        return week;
    }

    getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (+d - +yearStart) / 86400000) + 1)/7)
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    }

    createCalendarDay(date:number,disable:boolean): MyCalendarDay {

        let day = new Date(date);
        let today = new Date();

        let isToday = (day.toDateString() == today.toDateString())?true:false;

        return {
            date:date,
            isToday:isToday,
            selected:true,
            disable:disable,
            title:new Date(date).getDate().toString()
        };
    }

    createCalendarOriginal(year: number,month:number,week:number,mode:MyCalendarMode): MyCalendarOriginal {

        let title = '';

        if(mode == 'week') {
            title = year+' | 第'+week+'周';
        } else if(mode == 'month') {
            title = year+' | '+month+'月';
        }

        return {
            year: year,
            month: month,
            week: week,
            title:title
        }
    }

    createCalendarMonth(year:number,month:number,day:number):MyCalendarDays {
        console.log(month);

        let totalDays = new Date(year, month, 0).getDate();
        let firstDay = new Date(year, month-1, 1);
        let lastDay = new Date(year, month, 0);

        console.log(totalDays);

        let days: Array<MyCalendarDay> = new Array<MyCalendarDay>();

        // 获取之前
        if(firstDay.getDay()>0) {
            for (let i=0;i<firstDay.getDay();i++) {
                let tmpDay = new Date(year, month-1, 1);
                let day = tmpDay.setDate(firstDay.getDate() - (firstDay.getDay()-i));
                days.push(this.createCalendarDay(day,true));
            }
        }


        for(let i=0;i<totalDays;i++) {

            let tmpDay = new Date(year, month-1, 1);
            let day = tmpDay.setDate(tmpDay.getDate()+i);
            days.push(this.createCalendarDay(day,false));
        }

        // 获取尾数
        if(lastDay.getDay()<6) {
            for(let i=1;i<=(6-lastDay.getDay());i++) {
                let tmpDay = new Date(year, month, 0);
                let day = tmpDay.setDate(lastDay.getDate()+i);
                days.push(this.createCalendarDay(day,true));
            }
        }

        let currentDay = new Date(day);

        let week;

        if(currentDay.getFullYear() == year && (currentDay.getMonth() +1) == month) {
            week = this.getWeekNumber(currentDay)[1];
        } else {
            week = this.getWeekNumber(firstDay)[1];
        }

        return {
            original:this.createCalendarOriginal(year,month,week,'month'),
           days:days,
        }
    }

    createCalendarWeek(year:number,week:number):MyCalendarDays {
        let d = new Date("Jan 01, "+year+" 01:00:00");

        let w = d.getTime() + 604800000 * (week-1);

        let month = new Date(w).getMonth() + 1;

        let days: Array<MyCalendarDay> = new Array<MyCalendarDay>();

        for (let i=0;i<7;i++) {
            let day = 0;
            day = w + 60*1000*60*24*i;
            days.push(this.createCalendarDay(day,false))
        }

        return {
            original:this.createCalendarOriginal(year,month,week,'week'),
            days:days,
        }

    }
}


