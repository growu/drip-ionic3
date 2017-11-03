import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyCalendarComponent} from './my-calendar.component';

@NgModule({
    declarations: [
        MyCalendarComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyCalendarComponent
    ],
    providers: []
})
export class MyCalendarComponentModule {
}
