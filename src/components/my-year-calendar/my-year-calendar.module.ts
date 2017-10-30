import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyYearCalendarComponent } from './my-year-calendar';

@NgModule({
    declarations: [
        MyYearCalendarComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyYearCalendarComponent
    ],
    providers: [
    ]
})
export class MyYearCalendarComponentModule {}


