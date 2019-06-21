import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DpCalendarComponent} from './dp-calendar.component';

@NgModule({
    declarations: [
        DpCalendarComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        DpCalendarComponent
    ],
    providers: []
})
export class DpCalendarComponentModule {
}
