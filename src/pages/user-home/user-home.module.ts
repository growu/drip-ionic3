import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserHomePage} from './user-home';
import {IonicImageViewerModule} from "ionic-img-viewer";
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";

@NgModule({
    declarations: [
        UserHomePage,
    ],
    imports: [
        IonicPageModule.forChild(UserHomePage),
        IonicImageViewerModule,
        SuperTabsModule
    ],
    providers:[
        SuperTabsController
    ]
})
export class UserHomePageModule {
}
