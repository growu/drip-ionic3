import {NgModule} from '@angular/core';
import {HomePage} from './home';
import {IonicPageModule} from 'ionic-angular';
import {DpCalendarComponentModule} from '../../components/dp-calendar/dp-calendar.module';
import {DragulaModule,DragulaService} from 'ng2-dragula/ng2-dragula';
import {PipesModule} from '../../pipes/pipes.module'
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        DpCalendarComponentModule,
        DragulaModule,
        PipesModule,
        TimeAgoPipeModule
    ],
    entryComponents: []
})
export class HomePageModule {
}