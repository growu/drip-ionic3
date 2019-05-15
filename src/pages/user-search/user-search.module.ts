import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserSearchPage} from './user-search';
import {MyFollowButtonComponentModule} from "../../components/my-follow-button/my-follow-button.module";

@NgModule({
    declarations: [
        UserSearchPage,
    ],
    imports: [
        IonicPageModule.forChild(UserSearchPage),
        MyFollowButtonComponentModule
    ],
})
export class UserSearchPageModule {
}
