import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserHomePage} from './user-home';
import {IonicImageViewerModule} from "ionic-img-viewer";
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";
import {DpVipButtonComponentModule} from "../../components/dp-vip-button/dp-vip-button.module";

@NgModule({
    declarations: [
        UserHomePage,
    ],
    imports: [
        IonicPageModule.forChild(UserHomePage),
        IonicImageViewerModule,
        SuperTabsModule,
        DpVipButtonComponentModule
    ],
    providers:[
        SuperTabsController
    ]
})
export class UserHomePageModule {
}
