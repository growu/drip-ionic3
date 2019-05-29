/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2019/5/17
 * @version 1.0
 */

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DpUserComponent } from './dp-user';
import { MyFollowButtonComponentModule } from '../my-follow-button/my-follow-button.module';

@NgModule({
    declarations: [
        DpUserComponent,
    ],
    imports: [
        IonicModule,
        MyFollowButtonComponentModule
    ],
    exports: [
        DpUserComponent
    ]
})
export class DpUserComponentModule {}
