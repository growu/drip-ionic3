/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2018/3/27
 * @version 1.0
 */

import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DpUserAvatarComponent} from './dp-user-avatar';

@NgModule({
    declarations: [
        DpUserAvatarComponent
    ],
    imports: [
        IonicModule,
    ],
    providers: [
    ],
    exports: [
        DpUserAvatarComponent
    ],
    entryComponents: [
        DpUserAvatarComponent
    ],
})
export class DpUserAvatarModule {
}
