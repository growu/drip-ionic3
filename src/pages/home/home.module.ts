/**
 * Created by Jason.z on 2017/7/4.
 */

import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { MyCalendarComponent } from '../../components/my-calendar/my-calendar.component';

@NgModule({
    declarations: [
        HomePage,
        MyCalendarComponent
    ],
    imports: [IonicPageModule.forChild(HomePage)],
})
export class HomePageModule { }