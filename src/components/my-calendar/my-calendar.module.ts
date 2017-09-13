/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/11
 * @version 1.0
 */

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyCalendarComponent } from './my-calendar.component';

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
    providers: [
    ]
})
export class MyCalendarComponentModule {}
