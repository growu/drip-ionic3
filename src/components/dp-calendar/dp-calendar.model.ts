/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/12
 * @version 1.0
 */

export type DpCalendarMode = 'month' | 'week';

export interface MyCalendarOriginal {
    year: number;
    month: number;
    week: number;
    title: string;
}


export interface DpCalendarDay {
    date: number;
    isToday: boolean;
    events: number;
    disable: boolean;
    title:string;
}

export class DpCalendarDays {
    original:MyCalendarOriginal;
    days: Array<DpCalendarDay | void>
}
