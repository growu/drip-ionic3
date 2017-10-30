import {NgModule} from '@angular/core';
import {HomePage} from './home';
import {IonicPageModule} from 'ionic-angular';
import {MyCalendarComponentModule} from '../../components/my-calendar/my-calendar.module';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        MyCalendarComponentModule
    ],
    entryComponents: []
})
export class HomePageModule {
}