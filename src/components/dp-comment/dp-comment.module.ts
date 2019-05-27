/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2019/5/17
 * @version 1.0
 */

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DpCommentComponent } from './dp-comment';
import {TimeAgoPipeModule} from '../../pipes/time-ago/time-ago.module';
import {MomentModule} from 'angular2-moment';

@NgModule({
    declarations: [
        DpCommentComponent,
    ],
    imports: [
        IonicModule,
        TimeAgoPipeModule,
        MomentModule
    ],
    exports: [
        DpCommentComponent
    ]
})
export class DpCommentComponentModule {}
