import {NgModule} from '@angular/core';
import {HomePage} from './home';
import {IonicPageModule} from 'ionic-angular';
import {MyCalendarComponentModule} from '../../components/my-calendar/my-calendar.module';
import {DragulaModule,DragulaService} from 'ng2-dragula/ng2-dragula';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        MyCalendarComponentModule,
        DragulaModule
    ],
    entryComponents: []
})
export class HomePageModule {
}