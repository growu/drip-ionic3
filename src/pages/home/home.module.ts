import {NgModule} from '@angular/core';
import {HomePage} from './home';
import {IonicPageModule} from 'ionic-angular';
import {MyCalendarComponent} from '../../components/my-calendar/my-calendar.component';

@NgModule({
    declarations: [
        HomePage,
        MyCalendarComponent
    ],
    imports: [IonicPageModule.forChild(HomePage)],
    entryComponents: [
    ]
})
export class HomePageModule {
}