import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyPage} from './my';

@NgModule({
    declarations: [
        MyPage,
    ],
    imports: [
        IonicPageModule.forChild(MyPage),
    ],
})
export class MyPageModule {
}
