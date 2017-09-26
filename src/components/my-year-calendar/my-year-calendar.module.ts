/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/26
 * @version 1.0
 */

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
export class MyCalendarComponentModule {}


