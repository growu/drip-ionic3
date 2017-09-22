/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/20
 * @version 1.0
 */

import { NgModule }      from '@angular/core';
import { TimeAgoPipe }   from './time-ago';

@NgModule({
    imports:        [],
    declarations:   [TimeAgoPipe],
    exports:        [TimeAgoPipe],
})

export class TimeAgoPipeModule {

    // static forRoot() {
    //     return {
    //         ngModule: TimeAgoPipeModule,
    //         providers: [],
    //     };
    // }
}