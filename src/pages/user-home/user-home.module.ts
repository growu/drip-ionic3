import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserHomePage} from './user-home';
import {IonicImageViewerModule} from "ionic-img-viewer";

@NgModule({
    declarations: [
        UserHomePage,
    ],
    imports: [
        IonicPageModule.forChild(UserHomePage),
        IonicImageViewerModule
    ],
})
export class UserHomePageModule {
}
