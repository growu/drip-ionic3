import {NgModule} from '@angular/core';
import {HomePage} from './home';
import {IonicPageModule} from 'ionic-angular';
import {MyCalendarComponentModule} from '../../components/my-calendar/my-calendar.module';
import {DragulaModule,DragulaService} from 'ng2-dragula/ng2-dragula';
import {PipesModule} from '../../pipes/pipes.module'
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        MyCalendarComponentModule,
        DragulaModule,
        PipesModule,
        TimeAgoPipeModule
    ],
    entryComponents: []
})
export class HomePageModule {
}