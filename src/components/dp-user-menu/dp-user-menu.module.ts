/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2018/3/27
 * @version 1.0
 */

import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DpUserMenuComponent} from './dp-user-menu';

@NgModule({
    declarations: [
        DpUserMenuComponent
    ],
    imports: [
        IonicModule,
    ],
    providers: [
    ],
    exports: [
        DpUserMenuComponent
    ],
    entryComponents: [
        DpUserMenuComponent
    ],
})
export class DpUserMenuModule {
}
