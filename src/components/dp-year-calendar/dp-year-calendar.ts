import {Component} from '@angular/core';


@Component({
    selector: 'dp-year-calendar',
    templateUrl: 'dp-year-calendar.html'
})
export class DpYearCalendarComponent {

    _weekArray: string[] = ['一', '二', '三', '四', '五', '六', '日'];
    color: string = 'primary';

    constructor() {

    }

}
