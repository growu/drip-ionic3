/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/12
 * @version 1.0
 */

export type MyCalendarMode = 'month' | 'week';

export interface MyCalendarOriginal {
    year: number;
    month: number;
    week: number;
    title: string;
}


export interface MyCalendarDay {
    date: number;
    isToday: boolean;
    events: number;
    disable: boolean;
    title:string;
}

export class MyCalendarDays {
    original:MyCalendarOriginal;
    days: Array<MyCalendarDay | void>
}
