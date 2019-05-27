/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2019/5/17
 * @version 1.0
 */

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DpCommentToolbarComponent } from './dp-comment-toolbar';

@NgModule({
    declarations: [
        DpCommentToolbarComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        DpCommentToolbarComponent
    ]
})
export class DpCommentToolbarComponentModule {}
