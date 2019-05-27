import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MyPage} from './my';
import {DpVipButtonComponentModule} from "../../components/dp-vip-button/dp-vip-button.module";

@NgModule({
    declarations: [
        MyPage,
    ],
    imports: [
        IonicPageModule.forChild(MyPage),
        DpVipButtonComponentModule
    ],
})
export class MyPageModule {
}
